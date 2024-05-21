import api from './Api';

const Login = async(userLogin) => {
    return await api.post('USERS/Login', userLogin).then(res => res.data);
}

const GetUserById = async(id) => {
    return await api.get(`USERS/${id}`).then(res => res.data);
}

const AddUser = async(User) => {
    return await api.post('USERS', User).then(res => res.data);
}

 const RemoveUser = async(id) => {
    return await api.delete(`USERS/${id}`).then(res => res.data);
 }

export {RemoveUser, AddUser, GetUserById, Login}

