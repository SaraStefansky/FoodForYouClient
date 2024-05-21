import api from './Api';


const ChefLogin = async(chefLogin) => {
    return await api.post('CHEFS/Login', chefLogin).then(res => res.data);
}
const GetAllChefByServiceId = async(serviceId) => {
    return await api.get(`CHEFS/service/${serviceId}`).then(res => res.data);
}
const GetAllChef = async() => {
    return await api.get(`CHEFS`).then(res => res.data);
}
const GetChefById = async(chefId) => {
    return await api.get(`CHEFS/${chefId}`).then(res => res.data);
}
const AddChef = async(Chef) => {
    return await api.post('CHEFS', Chef).then(res => res.data);
}

 const UpdateChef = async(Chef) => {
    return await api.put(`CHEFS`,Chef ).then(res => res.data);
}

export {UpdateChef, AddChef, GetChefById, GetAllChef,GetAllChefByServiceId,ChefLogin}