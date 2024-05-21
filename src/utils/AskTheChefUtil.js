import api from './Api';

const GetAskTheChefById = async(id) => {
    return await api.get(`ASKTHECHEF/${id}`).then(res => res.data);
}

const AddAskTheChef = async(AskTheChef) => {
    return await api.post('ASKTHECHEF', AskTheChef).then(res => res.data);
}

export {GetAskTheChefById, AddAskTheChef}