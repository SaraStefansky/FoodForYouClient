import api from './Api';


const GetProducts = async(RecipefId) => {
    return await api.get(`PRODUCTS/${RecipefId}`).then(res => res.data);
}
const AddProducts= async(Product) => {   
    return await api.post('PRODUCTS', Product).then(res => res.data);
}
const RemoveProduct = async(id) => {
    return await api.delete(`PRODUCTS/${id}`).then(res => res.data);
 }

export {AddProducts, GetProducts,RemoveProduct}