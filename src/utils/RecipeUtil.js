import api from './Api';


const GetAllRecipeByCategoryId = async(categoryId) => {
    return await api.get(`RECIPES/category/${categoryId}`).then(res => res.data);
}

const GetAllRecipeByChefId = async(ChefId) => {
    return await api.get(`RECIPES/Chef/${ChefId}`).then(res => res.data);
}
const GetAllRecipes= async() => {
    return await api.get(`RECIPES`).then(res => res.data);
}
const GetRecipeById = async(RecipeId) => {
    return await api.get(`RECIPES/${RecipeId}`).then(res => res.data);
}
const AddRecipe= async(Recipe) => {
    return await api.post('RECIPES', Recipe).then(res => res.data);
}

const RemoveRecipe= async(RecipeId) => {
    return await api.delete(`RECIPES/${RecipeId}`).then(res => res.data);
 }

 const UpdateRecipe = async(Recipe) => {
    return await api.put(`RECIPES`,Recipe ).then(res => res.data);
}
export {AddRecipe, GetAllRecipeByCategoryId,GetAllRecipeByChefId, GetAllRecipes, GetRecipeById, RemoveRecipe, UpdateRecipe}

