import api from './Api';


const GetInstructions = async(RecipefId) => {
    return await api.get(`INSTRUCTIONS/${RecipefId}`).then(res => res.data);
}
const AddInstructions= async(Instruction) => {
    return await api.post('INSTRUCTIONS', Instruction).then(res => res.data);
}
const RemoveInstruction = async(id) => {
    return await api.delete(`INSTRUCTIONS/${id}`).then(res => res.data);
 }
export {AddInstructions , GetInstructions,RemoveInstruction}