import api from './Api';


const GetAllChefPic= async(id) => {
    return await api.get(`CHEF_PICS/${id}`).then(res => res.data);
}

const AddChefPic= async(ChefPic) => {
    return await api.post('CHEF_PICS', ChefPic).then(res => res.data);
}


export {AddChefPic, GetAllChefPic}