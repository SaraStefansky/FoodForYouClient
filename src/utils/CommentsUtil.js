import api from './Api';


const GetComments= async(RecipeId) => {
    return await api.get(`COMMENTSC/${RecipeId}`).then(res => res.data);
}
const AddComments = async(Comment) => {
    return await api.post('COMMENTSC', Comment).then(res => res.data);
}

export {AddComments, GetComments}