import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom'
import SuggestedRecipeCard from '../SuggestedRecipeCard'


const UserDashboard = ({ user }) => {
    // console.log(user)

    const [recipeArr, setRecipeArr] = useState([])
    const [cbrecipeArr, setCbRecipeArr] = useState([])
    const [eventsArr, setEventsArr] = useState([])

    //similar to component did mount
    useEffect(() => {
        populateRecipeArr();
        // suggestedRecipeThumbnail()
        // getEvents();
    }, [])

    //gets random recipe from API
    const getRandomRecipeFromAPI = async () => {
        try {
            let { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
            let recipe = data.meals[0]
            return recipe

        } catch (error) {
            console.log('err:', error)
        }
    }

    // creates array of 4 recipes from the API
    const populateRecipeArr = async () => {
        let r1 = await getRandomRecipeFromAPI()
        recipeArr.push(r1)

        let r2 = await getRandomRecipeFromAPI()
        recipeArr.push(r2)

        let r3 = await getRandomRecipeFromAPI()
        recipeArr.push(r3)

        let r4 = await getRandomRecipeFromAPI()
        recipeArr.push(r4)

        // console.log('arr:', recipeArr)
    }


    const getEvents = async () => {
        let user_id = user.id
        // console.log(user_id)
        try {
            let loggedinUserEvents = await axios.get(`/events/user/${user_id}`)
            console.log(loggedinUserEvents)
        } catch (error) {
            console.log(error)
        }
    }

    const suggestedRecipeThumbnail = recipeArr.map(el => (
        <SuggestedRecipeCard
            id={el.idMeal}
            imgSrc={el.strMealThumb}
            recipeName={el.strMeal}
            alt='db recipe'
        >
            {el}
        </SuggestedRecipeCard>
    ))
    console.log(suggestedRecipeThumbnail)
    console.log(recipeArr)
    


    return (
        <div className='user-dashboard'>
            <div className='dashboard-header'>
                <h1>hey {user.username}</h1>
            </div>

            <div className='dashboard-suggestions'>
                <h1>hi</h1> {suggestedRecipeThumbnail}
            </div>

            <div className='dashboard-cookbook'>

            </div>

            <div className='dashboard-events'>

            </div>
        </div>
    )
}


export default UserDashboard;