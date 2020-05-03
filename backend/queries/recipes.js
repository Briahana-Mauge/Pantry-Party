/*
Recipes Queries | Server | Tost-Host/Pantry Party Web App
GROUP 7: Suzette Islam, Douglas MacKrell, Maliq Taylor
*/

const ingredientsQueries = require('./ingredients')
const hashtagsQueries = require('./hashtags')

// DATABASE CONNECTION
const db = require('../database/db')

//GET
const getRecipeById = async (id) => {
    return await db.one('SELECT * FROM recipes WHERE id=$1', id)
}

//GET 
const getAllRecipesByUserId = async (userId) => {
    const getQuery = `SELECT * FROM recipes WHERE user_id = $1;`;
    let recipes = await db.any(getQuery, [userId]);
    return recipes
}

//POST
const createRecipe = async (bodyObj) => {
    const postQuery = `
        INSERT INTO recipes (
            user_id,
            recipe_name,
            directions,
            recipe_img,
            recipe_active,
            recipe_public
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;

    let recipe = await db.one(postQuery, [bodyObj.user_id, bodyObj.recipe_name, bodyObj.directions, bodyObj.recipe_img, bodyObj.recipe_active, bodyObj.recipe_public]);

    return recipe
}

//PATCH
const rewriteRecipe = async (recipe) => {
    let { recipe_name, directions, recipe_img, recipe_active, recipe_public } = recipe;
    try {
        let patchQuery = `UPDATE recipes SET `
        if (recipe_name) {
            patchQuery += `recipe_name = $/recipe_name/,`
        }
        if (directions) {
            patchQuery += `directions = $/directions/,`
        }
        if (recipe_img) {
            patchQuery += `recipe_img = $/recipe_img/,`
        }
        if (recipe_active) {
            patchQuery += `recipe_active = $/recipe_active/,`
        }
        if (recipe_public) {
            patchQuery += `recipe_public = $/recipe_public/,`
        }

        patchQuery = patchQuery.slice(0, patchQuery.length - 1);

        patchQuery += ` WHERE id = $/id/ RETURNING *`
        console.log(patchQuery)
        return await db.one(patchQuery, recipe);
    } catch (err) {
        throw (err);
    }
}

//GET
const getWholeRecipeById = async (id) => {
    const call1 = await db.one(
        `SELECT *
        FROM recipes R
        WHERE R.id=$1
        `, id)

    const call2 = await db.any(
        `SELECT *
        FROM ingredients I
        WHERE I.recipe_id=$1
        `, id)

    const call3 = await db.any(
        `SELECT *
        FROM hashtags H
        WHERE H.recipe_id=$1
        `, id)
    
    return [call1, call2, call3]
}

//GET 
const getAllFullRecipesByUserId = async (userId) => {
    let test1 = await getAllRecipesByUserId(userId)
    // console.log(test1)
    let fullRecipeArr = []
    let ingredientsArr = []
    let hashtagsArr = []
    for (let ingredient of test1) {
        let recipeId = ingredient.id
        ingredientsArr.push(await db.any(`
        SELECT *
        FROM ingredients
        WHERE recipe_id=$1`, recipeId))
    }
    for (let hashtag of test1) {
        let recipeId = hashtag.id
        hashtagsArr.push(await db.any(`
        SELECT *
        FROM hashtags
        WHERE recipe_id=$1`, recipeId))
    }
    // console.log(ingredientsArr)
    for (let i = 0; i < test1.length; i++){
        fullRecipeArr.push(test1[i], ingredientsArr[i], hashtagsArr[i])
    }
    return fullRecipeArr
}

//HELP1
const getRecipeByName = async (str) => {
    return await db.one('SELECT id FROM recipes WHERE recipe_name=$1', str)
}

//POST
const createFullRecipe = async (bodyObj) => {
    let call1 = await createRecipe(bodyObj)

    // let call2 = await getRecipeByName(bodyObj.recipe_name)

    let ingredients_list = bodyObj.ingredients

    let hashtags_list = bodyObj.hashtags

    for(let ingredient of ingredients_list) {
        ingredient.recipe_id = call1.id
    }

    for(let ingredient2 of ingredients_list) {
        await ingredientsQueries.createIngredient(ingredient2)
    }

    for(let hashtag of hashtags_list) {
        hashtag.recipe_id = call1.id
    }

    for(let hashtag2 of hashtags_list) {
        await hashtagsQueries.createHashtag(hashtag2)
    }


    console.log("call1", call1)

    console.log("ingredients_list", ingredients_list)

    console.log("hashtags_list", hashtags_list)

    return [call1, ingredients_list, hashtags_list]
}

/* EXPORT */
module.exports = {
    getRecipeById,
    getAllRecipesByUserId,
    createRecipe,
    rewriteRecipe,
    getWholeRecipeById,
    getAllFullRecipesByUserId,
    getRecipeByName,
    createFullRecipe
}

