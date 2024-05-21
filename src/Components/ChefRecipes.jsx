
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { GetAllServicesColinar, GetAllTypes } from "../utils/LookUpUtil";
import { GetAllRecipeByChefId, RemoveRecipe } from "../utils/RecipeUtil";
import { UpdateChef } from "../utils/ChefUtil";
import { IconButton, MenuItem, Select, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import chefSlice from "../redux/chefSlice";

const ChefRecipes = () => {
    const navigate = useNavigate();
    const connectedChef = useSelector(state => state.chef.connectedChef);
    const [recipes, setRecipes] = useState([{}])
    const [flagDelete, setFlagDelete] = useState(0)
    const handleRemoveRecipe = async (id) => {

        const res = await RemoveRecipe(id);
        if (res.data) {
            setFlagDelete(flagDelete++)
        }
        else {
            alert (" ארעה שגיאה במחיקת המתכון")
        }
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            const fetchRec = await GetAllRecipeByChefId(connectedChef.id)
            console.log(fetchRec);
            setRecipes(fetchRec);
        };
        fetchRecipes();
    }, [flagDelete])   
return(<div>            
    
    
<h1>המתכונים שלי</h1>
<IconButton onClick={() => navigate(`/Recipe/${0}`)}>

    <Typography >הוספת מתכון</Typography>
    <AddIcon />
</IconButton>

{recipes.map(recipe => (
    <div key={recipe.id}>
        <Link to={`/singleRecipe/${recipe.id}`}>{recipe.name}</Link>
        <IconButton onClick={() => handleRemoveRecipe(recipe.id)}>
            <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => navigate(`/Recipe/${recipe.id}`)}>
            <CreateIcon />
        </IconButton>
    </div>
))}


</div>

)

}

export default ChefRecipes;