
import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import { GetAllRecipeByChefId } from "../utils/RecipeUtil";
import { GetChefById } from "../utils/ChefUtil";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Email } from "@mui/icons-material";
import { AddAskTheChef } from "../utils/AskTheChefUtil";
 



const SingleChef = () =>{

    const connectedUser = useSelector(state => state.user.connectedUser);
    const [recipes, setRecipes] = useState([{}])
    const params = useParams()
    const [Chef, setChef] = useState({});
    const [ServiceColinarName, setServiceColinarName] = useState('NNN');
    const [askTheChef,setAskTheChef]=useState(" ");



    const GetServiceColinarName = () => {
       if(Chef.serviceId==1)
            setServiceColinarName("  קייטרינג חלבי")
        else if (Chef.serviceId==1)
            setServiceColinarName("  קייטרינג בשרי")
        else if (Chef.serviceId==2)
            setServiceColinarName("  עוגות ומארזים")
        else if (Chef.serviceId==3)
            setServiceColinarName("  קייטרינג חלבי")
        else 
            setServiceColinarName("  קייטרינג חלבי")
      }


        const addAskTheChef = async () => {
            try {
                const newAskTheChef = {
                    chefId: Chef.id,
                    phonene: Chef.phone,
                    email: connectedUser.email,
                    name: connectedUser.name,
                    desc: askTheChef,
                    date: new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format
                };
                await AddAskTheChef(newAskTheChef);
                setAskTheChef(""); // Clear the comment input after adding
               
            } catch (error) {
                console.error('ארעה תקלה', error);
            }
        };

   

      useEffect(() => {
        
        GetServiceColinarName();
    }, [Chef.serviceId])

    useEffect(() => {
        

        const fetchChef = async () => {
            try {
                const chefData = await GetChefById(params.chefId);
                setChef(chefData);

            } catch (error) {
                console.error('Error fetching chef:', error);
            }
        }; fetchChef();
    }, [])

    useEffect(() => {
        const fetchRecipes = async () => {
            const fetchRec = await GetAllRecipeByChefId(params.chefId);
            console.log(fetchRec);
            setRecipes(fetchRec);
        };
        fetchRecipes();
    }, []);
    

        return (<div className="center" dir="rtl">


           <h1>{Chef.firstName}   {Chef.lastName}</h1>
           <h4>קצת עליי</h4>
           <text>{Chef.desc}</text>
           <h4>פרטים אישיים</h4> 
           <ul>
            {ServiceColinarName !== null && (<li> <text>{ServiceColinarName}</text></li>)}
            {Chef.phone !== null && (<li> <text>פלאפון: 0{Chef.phone}</text></li>)}
            {Chef.kosher !== null && (<li> <text>כשרות: {Chef.kosher}</text></li>)}
            {Chef.urlWebsite !== null && (<li> <a href={Chef.urlWebsite} target="_blank">האתר שלי</a></li>)}
          </ul>
          <h4>המתכונים שלי</h4><ul>
            {recipes.map(recipe => (
            <div key={recipe.id}><li>
            <Link to={`/singleRecipe/${recipe.id}`}>{recipe.name}</Link>   </li>
            </div>))}</ul>

<br></br>
 

  {connectedUser && connectedUser.id && (
                <div>  <h3>להשארת פניה לשפית</h3>
                    <TextField
                        id="filled-basic"
                        label="askTheChef"
                        placeholder=" השאר פניה "
                        variant="filled"
                        value={askTheChef}
                        onChange={(e) => setAskTheChef(e.target.value)}
                    />
                    <Button onClick={addAskTheChef} variant="contained">
                        שלח פניה 
                    </Button>
                </div>
            )}    
    </div>)    

    
}

export default SingleChef;
