import React from 'react'
import {Link} from 'react-router-dom'

const SuggestedRecipeCard = ({recipeName, imgSrc, id}) => {
    console.log(recipeName, imgSrc)
    return(
        
        <div className='api-recipe' id={id} > 
        {/*  make a function that expands thumbnail to recipe page */ }
        <Link to={`/recipe/${id}`}>
            <img src ={imgSrc} />
            <h1>{recipeName}</h1>
            </Link>
        </div>
        
    )
}

export default SuggestedRecipeCard