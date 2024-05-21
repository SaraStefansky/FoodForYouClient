

import '../CSS/HPcss.css'
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetRecipesLikes } from '../utils/RecipeLikeUtil';
import { useSelector } from 'react-redux';
import {  GetAllRecipes } from '../utils/RecipeUtil';



const Recipes = () => {
    const [error, setError] = useState("");
    const connectedUser = useSelector(state => state.user.connectedUser);
    // const [recipeLike, setRecipeLike] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [allRecipes, setAllRecipes] = useState([]);
  

    const navigate = useNavigate();

    
  useEffect(() => {
    // טעינת כל המתכונים ברגע שהדף נטען
    const fetchAllRecipes = async () => {
      try {
        const recipes = await GetAllRecipes();
        setAllRecipes(recipes);
      } catch (error) {
        console.error('Error fetching all recipes:', error);
      }
    };
    fetchAllRecipes();
  }, []);

    const handleClickRecipes = (url) => {
        navigate(url);
    };
 
    //  const RecipeLikeBotton = async() => {
    //     await GetRecipesLikes(connectedUser.id).then(res => {
    //         if(res){
    //             alert('Success');
    //             console.log(res);
    //             setRecipeLike(res);
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         setError("תקלה");
    //     });
    //  }

     const handleSearch = () => {
        if (searchTerm.trim() !== '') {
          const filteredRecipes = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
          return filteredRecipes.map(recipe => (
            <div key={recipe.id}>
             
              <Link to={`/singleRecipe/${recipe.id}`}> {recipe.name} <br></br>  <img src={recipe.urlPic} width={70} alt={recipe.name} /></Link>
            </div>
          ));
        } else {
          return null;
        }
      };
    
  
      return (
        <div className= "center" dir='rtl'>
        <div  className='containerStyle'>
            <center>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${1}`)}>מתכונים בעשר דקות</button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${2}`)}>מתכוני בריאות</button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${3}`)}>תוספות</button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${4}`)}>  חלבי</button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${5}`)}>  מנות עיקריות</button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${9}`)}> סלטים </button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${6}`)}> עוגות ועוגיות</button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${7}`)}>קינוחים ומתוקים</button>
                <button className='button-style' onClick={() => handleClickRecipes(`/recipeCategory/${8}`)}> מאפים </button>
                </center>
                </div>
              <br></br>
                <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={handleSearch}>חיפוש</Button>
        {handleSearch()}
      </div>
      <br></br>


      {allRecipes ? allRecipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/singleRecipe/${recipe.id}`}> <h3 className='center'>{recipe.name} </h3><br></br>  <img src={recipe.urlPic} width={300} alt={recipe.name} /></Link>
        </div>
        
      )) : <div>opps</div>}

        </div>
    );
};

export default Recipes;
