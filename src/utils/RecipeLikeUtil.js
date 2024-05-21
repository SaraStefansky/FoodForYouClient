import api from './Api';



const GetRecipesLikes = async(UserId) => {
    return await api.get(`RECIPES_LIKE/${UserId}`).then(res => res.data);
}
const AddRecipesLike= async(RecipesLike) => {   
    return await api.post('RECIPES_LIKE', RecipesLike).then(res => res.data);
}

const RemoveRecipesLike = async(id) => {
    return await api.delete(`RECIPES_LIKE/${id}`).then(res => res.data);
 }


export {GetRecipesLikes, AddRecipesLike,RemoveRecipesLike}