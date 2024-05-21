import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetAllRecipeByCategoryId } from '../utils/RecipeUtil';
import Button from '@mui/material/Button';


const RecipeCategory = () => {
  const [recipeCategoryName, setRecipeCategoryName] = useState('NNN');
  const [recipeCategories, setRecipeCategories] = useState([]);
  const navigate = useNavigate();
  const params = useParams()
  const [searchTerm, setSearchTerm] = useState('');
  // const [allRecipesByCategory, setAllRecipesByCategory] = useState([]);

 
  // useEffect(() => {
  //   // טעינת כל המתכונים ברגע שהדף נטען
  //   const fetchAllRecipesByCategory = async () => {
  //     try {
  //       const recipesByCategory = await GetAllRecipeByCategoryId();
  //       setAllRecipesByCategory(recipesByCategory);
  //     } catch (error) {
  //       console.error('Error fetching all recipes by ctegory:', error);
  //     }
  //   };
  //   fetchAllRecipesByCategory();
  // }, []);
  
  useEffect(() => {
    GetRecipeCategoryName()
    console.log(params);
    const fetchRecipeCategories= async () => {
      try {
        const RecipeCategoriesData = await GetAllRecipeByCategoryId(params.categoryId);
        setRecipeCategories(RecipeCategoriesData);

      } catch (error) {
        console.error('Error fetching RecipeCategories:', error);
      }
    };

    fetchRecipeCategories();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const filteredRecipes = recipeCategories.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return filteredRecipes.map(recipe => (
        <div key={recipe.id}>
         
          <Link to={`/singleRecipe/${recipe.id}`}> {recipe.name} <br></br>  <img src={recipe.urlPic} width={70} alt={recipe.name} /></Link>
        </div>
      ));
    } else {
      return null;
    }
  };
  const GetRecipeCategoryName = () => {
    console.log(recipeCategoryName)
    switch (params.categoryId) {
      case '1':
        setRecipeCategoryName("   מתכונים בעשר דקות")
        break;
        case '2':
          setRecipeCategoryName("  מתכוני בריאות ")
          break;
        case '3':
          setRecipeCategoryName("  תוספות ")
          break;
        case '4':
          setRecipeCategoryName("  חלבי")
          break;
        case '5':
          setRecipeCategoryName(" מנות עיקריות   ")
          break;
        case '6':
          setRecipeCategoryName(" עוגות ועוגיות   ")
          break;
        case '7':
            setRecipeCategoryName("  קינוחים ומתוקים   ")
          break;
        case '8':
            setRecipeCategoryName("  מאפים   ")
          break;  
        case '9':
            setRecipeCategoryName(" סלטים  ")
          break;
       
          

      default:
        break;
    }
  }

  return (
    <div className= "center" dir='rtl'>
      <h1>{recipeCategoryName}</h1>

      <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={handleSearch}>חיפוש</Button>
        {handleSearch()}
      </div>

      {recipeCategories ? recipeCategories.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/singleRecipe/${recipe.id}`}> <h3 className='center'>{recipe.name} </h3><br></br>  <img src={recipe.urlPic} width={300} alt={recipe.name} /></Link>
        </div>
        
      )) : <div>opps</div>}
    </div>
  );
};

export default RecipeCategory;
