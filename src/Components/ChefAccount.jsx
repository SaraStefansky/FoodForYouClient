import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { GetAllServicesColinar } from "../utils/LookUpUtil";
import { UpdateChef } from "../utils/ChefUtil";
import { IconButton, MenuItem, Select, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const ChefAccount = () => {
    const navigate = useNavigate();
    const connectedChef = useSelector(state => state.chef.connectedChef);
    const [error, setError] = useState("");
    const [services, setServices] = useState([]);
    
    let emptyChef = {
        ...connectedChef,
        urlWebsite: "",
        kosher: "",
        phone: "",
        desc: "",
        serviceId: 0,
    };

    const [chefDetails, setChefDetails] = useState(
        connectedChef && connectedChef.desc === "" ? emptyChef : connectedChef
    );

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleChangeChef = (e) => {
        const { name, value } = e.target;
        setChefDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClickUpdateChef = async () => {
        if (chefDetails.desc === "" || chefDetails.serviceId === 0 || chefDetails.phone === "") {
            setError("חובה למלא את כל השדות המסומנים ב * ");
            return;
        }
        try {
            const res = await UpdateChef(chefDetails);
            if (res) {
                alert("Success");
                navigate(`/chefRecipes/${connectedChef.id}`);
            } else {
                setError("ארעה תקלה במהלך שמירת נתונים");
            }
        } catch (error) {
            setError("ארעה תקלה במהלך שמירת נתונים");
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetchSer = await GetAllServicesColinar();
                setServices(fetchSer);
            } catch (error) {
                setError("ארעה תקלה בטעינת השירותים");
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="center" dir="rtl">
            <h1>האזור האישי של {connectedChef.firstName}</h1>
            <div>
                <h2>פרטים אישיים</h2>
                <label>בחרי את השירות אותו את נותנת:* </label>
                <Select 
                    name="serviceId" 
                    value={chefDetails.serviceId} 
                    onChange={handleChangeChef}
                >
                    {services.length > 0 
                        ? services.map(service => (
                            <MenuItem key={service.id} value={service.id}>
                                {service.desc}
                            </MenuItem>
                        ))
                        : <MenuItem disabled>טוען שירותים...</MenuItem>
                    }
                </Select> 
                <br />
                <label>כשרות:</label>
                <TextField 
                    id="filled-basic" 
                    placeholder="הכנס כשרות" 
                    variant="filled" 
                    name="kosher" 
                    value={chefDetails.kosher} 
                    onChange={handleChangeChef} 
                />
                <br />
                <label>קישור לאתר:</label>
                <TextField 
                    id="filled-basic" 
                    variant="filled" 
                    name="urlWebsite" 
                    value={chefDetails.urlWebsite} 
                    onChange={handleChangeChef} 
                />
                <br />
                <label>טלפון ליצירת קשר:* </label>
                <TextField 
                    id="filled-basic" 
                    placeholder="מספר זה יוצג למשתמשים" 
                    variant="filled" 
                    name="phone" 
                    value={chefDetails.phone} 
                    onChange={handleChangeChef} 
                />
                <br />
                <label>קצת עלייך:* </label>
                <TextField 
                    id="filled-basic" 
                    variant="filled" 
                    name="desc" 
                    value={chefDetails.desc} 
                    onChange={handleChangeChef} 
                />
                <br />
                <label>תמונות:</label>
                <Button 
                    component="label" 
                    role={undefined} 
                    variant="contained" 
                    tabIndex={-1} 
                    startIcon={<CloudUploadIcon />}
                >
                    להעלאת תמונות 
                    <VisuallyHiddenInput type="file" />
                </Button>
                <br />
                <Button onClick={handleClickUpdateChef} variant="contained">
                    שמור נתונים
                </Button>
            </div>
            <Link to={`/chefRecipes/${connectedChef.id}`}>למתכונים שלי</Link> 
        </div>
    );
};

export default ChefAccount;
