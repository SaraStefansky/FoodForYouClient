import React, { useEffect, useState } from "react";
import { GetAllCategories, GetAllTypes, GetAllLevels } from "../utils/LookUpUtil";
import { TextField, Select, MenuItem, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AddRecipe } from "../utils/RecipeUtil";

const Recipe = () => {
    const [categories, setCategories] = useState([]); 
    const [levels, setLevels] = useState([]);
    const [types, setTypes] = useState([]);
    const [error, setError] = useState("");

    const [recipe, setRecipe] = useState({
        name: "", 
        categoryId: 10,
        levelId: 4,
        typeId: 4,
        time: "",
        urlPics: "",
        desc: ""
    });

    const handleClickSubmitRecipe = async () => {
        console.log(recipe);
        if (!validateRecipe()) {
            return;
        }
        try {
            const res = await AddRecipe(recipe);
            if (res) {
                alert("המתכון נשמר בהצלחה!");
                // ניקוי הטופס או פעולות נוספות אם נדרש
            } else {
                setError("ארעה תקלה במהלך שמירת המתכון");
            }
        } catch (error) {
            setError("ארעה שגיאה בשמירת המתכון: " + error.message);
        }
    };

    const validateRecipe = () => {
        if (
            recipe.name.trim() === "" || 
            recipe.desc.trim() === "" || 
            recipe.categoryId === 10 || 
            recipe.levelId === 4 || 
            recipe.typeId === 4 || 
            recipe.time.trim() === "" ||
            parseInt(recipe.time) <= 0
        ) {
            setError("חובה למלא את כל השדות במתכון");
            return false;
        }
        if (!Number.isInteger(parseInt(recipe.time))) {
            setError("זמן הכנה חייב להיות מספר שלם חיובי");
            return false;
        }
        return true;
    };

    const handleChangeRecipe = (e) => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        // Handle file upload logic here...
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const levelsData = await GetAllLevels();
                setLevels(levelsData);
                
                const typesData = await GetAllTypes();
                setTypes(typesData);

                const categoriesData = await GetAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('שגיאה בשליפת הנתונים:', error);
            }
        };

        fetchData();
    }, []);

    

    return (
        <div className="center" dir="rtl">
            <h1>עריכת מתכון</h1>
            <br />
            <label>שם המתכון:</label>
            <TextField 
                id="filled-basic" 
                variant="filled" 
                name="name" 
                value={recipe.name} 
                onChange={handleChangeRecipe} 
            />
            <br />
            
            <label> קטגוריה </label>
            <Select name="categoryId" value={recipe.categoryId} onChange={handleChangeRecipe}>
                {categories.length > 0 
                    ? categories.map(category => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.desc}
                        </MenuItem>
                    )) 
                    : <MenuItem disabled>טוען ...</MenuItem>
                }
            </Select>
            <br />

            <label> רמת קושי </label>
            <Select name="levelId" value={recipe.levelId} onChange={handleChangeRecipe}>
                {levels.length > 0 
                    ? levels.map(level => (
                        <MenuItem key={level.id} value={level.id}>
                            {level.desc}
                        </MenuItem>
                    )) 
                    : <MenuItem disabled>טוען ...</MenuItem>
                }
            </Select>
            <br />

            <label> סוג </label>
            <Select name="typeId" value={recipe.typeId} onChange={handleChangeRecipe}>
                {types.length > 0 
                    ? types.map(type => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.desc}
                        </MenuItem>
                    )) 
                    : <MenuItem disabled>טוען ...</MenuItem>
                }
            </Select>
            <br />
            <label> זמן הכנה בדקות:</label>
            <TextField 
                id="filled-basic" 
                variant="filled" 
                name="time" 
                value={recipe.time} 
                onChange={handleChangeRecipe} 
            />
            <br />
            <label>קצת על המתכון:</label>
            <TextField 
                id="filled-basic" 
                variant="filled" 
                name="desc" 
                value={recipe.desc} 
                onChange={handleChangeRecipe} 
            />
            <br />
            
            <br />
            <label>תמונות:</label>

            <Button 
                component="label" 
                role={undefined} 
                variant="contained" 
                startIcon={<CloudUploadIcon />}
            >
                {recipe.urlPics ? "החלף תמונה" : "להעלאת תמונות"} 
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
            </Button>

            <Button onClick={handleClickSubmitRecipe} variant="contained">שמירת המתכון</Button>

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default Recipe;
