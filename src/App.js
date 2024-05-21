import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import HomePage from './Components/HomePage';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Recipes from './Components/Recipes';
import RecipeCategory from './Components/RecipeCategory';
import SingleRecipe from './Components/SingleRecipe';
import ServiceColinar from './Components/ServiceColinar';
import ServiceColinarCategory from './Components/ServiceColinarCategory';
import SingleChef from './Components/SingleChef';
import ChefAccount from './Components/ChefAccount';
import Recipe from './Components/Recipe';
import ChefRecipes from './Components/ChefRecipes';






function App() {
  const connectedUser = useSelector(state => state.user.connectedUser);
  const connectedChef = useSelector(state => state.chef.connectedChef);
  return (
    <>
    <div>
    <Link to="/">
    <img src="/Logo.png" width={120}/>
    </Link>
    {connectedUser !=null && <><br/><span>שלום {connectedUser.firstName + " " + connectedUser.lastName}</span></>}
    {connectedChef !=null && <><br/><span>שלום {connectedChef.firstName + " " + connectedChef.lastName}</span></>}
    </div>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="recipes" element={<Recipes/>}/>
      <Route path='recipeCategory/:categoryId' element={<RecipeCategory/>}/>
      <Route path='singleRecipe/:recipeId' element={<SingleRecipe/>}/>
      <Route path='ServiceColinar' element={<ServiceColinar/>}/>
      <Route path='serviceColinarCategory/:serviceId' element={<ServiceColinarCategory/>}/>
      <Route path='singleChef/:chefId' element={<SingleChef/>}/>
      <Route path='chefRecipes/:chefId' element={<ChefRecipes/>}/>
      <Route path='ChefAccount' element={<ChefAccount/>}/>
      <Route path='Recipe/:recipeId' element={<Recipe/>}/>
    </Routes>
    </>
  );
}

export default App;
