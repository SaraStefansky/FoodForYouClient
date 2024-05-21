import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../CSS/HPcss.css'
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { GetRecipesLikes } from '../utils/RecipeLikeUtil';
import { GetRecipeById, GetAllRecipes } from '../utils/RecipeUtil'; // צריך לייבא פונקציה שמחזירה את כל המתכונים


function HomePage() {

  const navigate = useNavigate();
  const connectedUser = useSelector((state) => state.user.connectedUser);
  const connectedChef = useSelector(state => state.chef.connectedChef);
  const [likedRecipesIds, setLikedRecipesIds] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);  
  const [searchTerm, setSearchTerm] = useState(''); // משתנה לאחסון מחרוזת החיפוש
  const [allRecipes, setAllRecipes] = useState([]); // מערך שמכיל את כל המתכונים
  const middleSectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  

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

  const handleScrollToMiddle = () => {
    if (middleSectionRef.current) {
      middleSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleClickLogin = (url) => {
    navigate(url);
  }

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const toggleHover2 = () => {
    setIsHovered2(!isHovered2);
  };
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

  useEffect(() => {
    const fetchLikedRecipesIds = async () => {
      if (connectedUser) {
        try {
          const recipesIds = await GetRecipesLikes(connectedUser.id);
          setLikedRecipesIds(recipesIds);
        } catch (error) {
          console.error('Error fetching liked recipes:', error);
        }
      }
    };
    fetchLikedRecipesIds();
  }, [connectedUser]);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      if (connectedUser) {
        try {
          const recipesPromises = likedRecipesIds.map(async (id) => {
            const recipe = await GetRecipeById(id.recipeId);
            return recipe;
          });
          const recipes = await Promise.all(recipesPromises);
          setLikedRecipes(recipes);
        } catch (error) {
          console.error('Error fetching liked recipes:', error);
        }
      }
    };
  
    fetchLikedRecipes();
  }, [likedRecipesIds, connectedUser]);

  return (
    <>
    <div className='containerStyle'>
         <button className='button-style' onClick={handleScrollToMiddle}>קצת עלינו</button>
         <button className='button-style' onClick={() => handleClickLogin("/signIn")}>התחברות</button>
         <button className='button-style' onClick={() => handleClickLogin("/signUp")}>הרשמה</button>
         {connectedChef!=null&&<button className='button-style' onClick={() => navigate("/ChefAccount")}>אזור אישי</button>}          
       
         <div style={{ width:'50px'}}>
         <button className='button-style' onClick={() => handleClickLogin("/ServiceColinar")} onMouseMove={toggleHover2} onMouseEnter={toggleHover2} onMouseLeave={toggleHover2}>שירותים קולינריים</button>
         <div className='dropdownStyle'>
          <ul  className={isHovered2? 'opacity-ul': 'noOpacity-ul'}>
              <li><Link to="/ServiceColinar/BreakfastPackages">מארזי ארוחות בוקר</Link></li>
              <li><Link to="/ServiceColinar/MilkCatering">קייטרינג חלבי</Link></li>
              <li><Link to="/ServiceColinar/MeatCatering">קייטרינג בשרי</Link></li>
              <li><Link to="/ServiceColinar/CakesAndPackages">עוגות ומארזי מתוקים </Link></li>
              <li><Link to="/ServiceColinar/FoodForShabat">אוכל לשבת </Link></li>
          </ul></div> </div>

          <div style={{ width:'50px'}}>
            <button className='button-style' onClick={() => handleClickLogin("/recipes")} onMouseMove={toggleHover} onMouseEnter={toggleHover} onMouseLeave={toggleHover} >מתכונים</button>
            <div className='dropdownStyle'>
            <ul className={isHovered? 'opacity-ul': 'noOpacity-ul'}>
              <li><Link to="/recipeCategory/1">מתכונים בעשר דקות</Link></li>
              <li><Link to="/recipeCategory/2">מתכונים בריאים</Link></li>
              <li><Link to="/recipeCategory/3">תוספות</Link></li>
              <li><Link to="/recipeCategory/5">מנות עיקריות</Link></li>
              <li><Link to="/recipeCategory/4">מתכונים חלבי</Link></li>
              <li><Link to="/recipeCategory/6" >עוגות ועוגיות</Link></li>
              <li><Link to="/recipeCategory/7">קינוחים ומתוקים</Link></li>
              <li><Link to="/recipeCategory/9">סלטים</Link></li>
              <li><Link to="/recipeCategory/8">מאפים</Link></li>
            </ul></div> </div>

          </div>

      {connectedUser && (
        <div>
          <h2>מתכונים שאהבת</h2>
          <ul>
            {likedRecipes.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/singleRecipe/${recipe.id}`}>{recipe.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
 <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={handleSearch}>חיפוש</Button>
        {handleSearch()}
      </div>

      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      <div dir='centered' ref={middleSectionRef} className='textStyle'> <h3 >ברוכים הבאים ל Food For You,<br></br>
        <br></br> אנחנו פלטפורמה שמחברת בין נותני שירות קולינרי מוכשר לנשים עם חובבות אוכל.
        <br></br> האתר שלנו מאפשר לספקי שירותים קולינריים להציג ולקדם את המתכונים הטעימים שלהם, ממוינים לפי קטגוריות.
        <br></br>   על ידי שיתוף המומחיות שלהם, הם זוכים לחשיפה עבור שירותי הקייטרינג שלהם.
        <br></br> כמשתמש, אתה יכול לחקור מגוון מגוון של מתכונים מוצלחים, ללמוד טכניקות בישול חדשות,
        <br></br>  ולמצוא את הקייטרינג המושלם לאירוע המיוחד הבא שלך.
        הצטרף לקהילת אוהבי האוכל שלנו ותחגוג את אומנות הבישול עם Food For You!</h3>
      </div>
    </>
  );
}

export default HomePage;
