import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetRecipeById } from "../utils/RecipeUtil";
import { GetChefById } from "../utils/ChefUtil";
import { GetProducts } from "../utils/ProductUtil";
import { GetInstructions } from "../utils/InstructionUtil";
import { AddComments, GetComments } from "../utils/CommentsUtil";
import { AddRecipesLike } from "../utils/RecipeLikeUtil";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";
import '../CSS/HPcss.css';

const SingleRecipe = () => {
    const params = useParams();
    const [chef, setChef] = useState({});
    const [recipe, setRecipe] = useState({});
    const [products, setProducts] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [levelName, setLevelName] = useState('');
    const [typeName, setTypeName] = useState('');
    const [liked, setLiked] = useState(false);
    const connectedUser = useSelector(state => state.user.connectedUser);

    const addRecipeLike = async () => {
        if (!liked) {
            let recipeLike = {
                userId: connectedUser.id,
                recipeId: params.recipeId,
            }
            try {
                await AddRecipesLike(recipeLike);
                setLiked(true);
            } catch (error) {
                console.error('Error adding recipe like:', error);
            }
        }
    };

    const addComment = async () => {
        try {
            const newComment = {
                userId: connectedUser.id,
                recipeId: params.recipeId,
                desc: comment,
                date: new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format
            };
            await AddComments(newComment);
            setComment(""); // Clear the comment input after adding
            fetchComments(); // Refresh comments
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const commentsData = await GetComments(params.recipeId);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeData = await GetRecipeById(params.recipeId);
                setRecipe(recipeData);

                switch (recipeData.levelId) {
                    case 1:
                        setLevelName("קל");
                        break;
                    case 2:
                        setLevelName("בינוני");
                        break;
                    case 3:
                        setLevelName("קשה");
                        break;
                    default:
                        setLevelName("");
                        break;
                }

                switch (recipeData.typeId) {
                    case 1:
                        setTypeName("חלבי");
                        break;
                    case 2:
                        setTypeName("בשרי");
                        break;
                    case 3:
                        setTypeName("פרווה");
                        break;
                    default:
                        setTypeName("");
                        break;
                }

                const chefData = await GetChefById(recipeData.chefId);
                setChef(chefData);

            } catch (error) {
                console.error('Error fetching recipe or chef:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const productsData = await GetProducts(params.recipeId);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchInstructions = async () => {
            try {
                const instructionsData = await GetInstructions(params.recipeId);
                setInstructions(instructionsData);
            } catch (error) {
                console.error('Error fetching instructions:', error);
            }
        };

        fetchRecipe();
        fetchProducts();
        fetchComments();
        fetchInstructions();
    }, [params.recipeId]);
    

    return (
        <div className="center" dir="rtl">
            <h1>{recipe.name} / <Link to={`/singleChef/${recipe.chefId}`}><span>{chef.firstName} {chef.lastName}</span></Link></h1>
            <h2>{recipe.desc}</h2>
            <img src={recipe.urlPic} width={300} alt={recipe.name} />
            <h3>זמן הכנה: {recipe.time} דקות</h3>
            <h3>דרגת קושי: {levelName}</h3>
            <h3>{typeName}</h3>

            <h1>מוצרים</h1>
            {products.length > 0 ? products.map((pro) => (
                <div key={pro.id}>
                    <span>{pro.order}. {pro.desc}</span><br />
                </div>
            )) : <div>Loading...</div>}

            <h1>הוראות הכנה</h1>
            {instructions.length > 0 ? instructions.map((inst) => (
                <div key={inst.id}>
                    <span>{inst.order}. {inst.desc}</span><br />
                </div>
            )) : <div>Loading...</div>}

            <br />
            {connectedUser && connectedUser.id ? (
                <div>
                    <Button onClick={addRecipeLike} className="like-button">
                        {liked ? <FavoriteIcon style={{ color: '#40ccb5' }} /> : <FavoriteBorderIcon style={{ color: '#40ccb5' }} />}
                    </Button>
                </div>
            ) : null}

           
            {connectedUser && connectedUser.id && (
                <div>  <h3>הוספת תגובה</h3>
                    <TextField
                        id="filled-basic"
                        label="comment"
                        placeholder="הכנס תגובה"
                        variant="filled"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button onClick={addComment} variant="contained">
                        שלח
                    </Button>
                </div>
            )}

            <h1>תגובות</h1>
            {comments.length > 0 ? comments.map((comm) => (
                <div key={comm.id}>
                    <h1>{comm.date}</h1>
                    <h1>{comm.desc}</h1>
                    <h1>{comm.userId}</h1>
                </div>
            )) : <div>Loading...</div>}
        </div>
    );
}

export default SingleRecipe;
