import api from './Api';


const GetAllTypes = async() => {
    return await api.get(`lookup/GetTypes`).then(res => res.data);
}

const GetAllAreas = async() => {
    return await api.get(`lookup/GetArea`).then(res => res.data);
}


const GetAllCategories = async() => {
    return await api.get('lookup/GetCategories').then(res => res.data);
}

const GetAllLevels = async() => {
    return await api.get(`lookup/GetLevels`).then(res => res.data);
}

const GetAllServicesColinar = async() => {
    return await api.get(`lookup/GetServicesColinar`).then(res => res.data);
}
export {GetAllTypes, GetAllServicesColinar, GetAllLevels, GetAllCategories, GetAllAreas}