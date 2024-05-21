import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AddUser } from '../utils/UserUtil';
import { AddChef } from '../utils/ChefUtil';
//import * as React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { setConnectedUser } from '../redux/userSlice';
import { setConnectedChef } from '../redux/chefSlice';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // גובה מינימלי של 100% מצטבר (כולל מרווח פנימי של התכנים)
    
  };
  
  
  const buttonStyle = {
    backgroundColor: '#00bfaa',
    color: 'black',
    border: '2px solid black',
    borderRadius: '10px',
    padding: '10px 20px',
    margin: '10px 0', // הוספת מרווח מתחת לכפתור
    cursor: 'pointer',
    
  };
  
  const textFieldStyle = {
    backgroundColor: '#00bfaa',
    color: 'black',
    border: '2px solid black',
    borderRadius: '10px',
    padding: '10px 20px',
    width: '50%', // כדי שה-TextField יתמלא את כל הרוחב
    marginBottom: '20px',
  };

const SignUp = () => {
    let userEmpty = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
    const [user, setUser] = useState(userEmpty);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeUser = (e) => {
        let { name, value } = e.target;
        let _user = { ...user };
        _user[name] = value;
        setUser(_user);
    };

    const handleClickSignUp = async() => {
        if(user.firstName == "" || user.lastName == "" || user.email == "" || user.password == ""){
            setError("חובה למלא את כל הנתונים");
            return;
        }
        setError("");
        // הוסף פעולות של הרשמה כאן
        await AddUser(user).then(res => {
            if(res){
                alert('Success');
                // שמירת המשתמש ברידקס כדי שיהיה מחובר לאתר
                dispatch(setConnectedUser(res));
                navigate('/');

            }
        }).catch(err => {
            console.log(err);
            setError("ארעה תקלה זמנית אנא נסה שנית מאוחר יותר");
        });
    };


    const handleClickChefSignUp = async() => {
        if(user.firstName == "" || user.lastName == "" || user.email == "" || user.password == ""){
            setError("חובה למלא את כל הנתונים");
            return;
        }
        setError("");
        // הוסף פעולות של הרשמה כאן
        await AddChef(user).then(res => {
            if(res){
                alert('Success');
                // שמירת המשתמש ברידקס כדי שיהיה מחובר לאתר
                dispatch(setConnectedChef(res));
                navigate('/');

            }
        }).catch(err => {
            console.log(err);
            setError("ארעה תקלה זמנית אנא נסה שנית מאוחר יותר");
        });
    };

    return (
        <> <div style={containerStyle}>
            <h1>הרשמה</h1>
            <TextField id="filled-basic" name="email" label="email" placeholder="כתובת מייל" variant="filled" value={user.email} onChange={(e) => handleChangeUser(e)} sx={{ ...textFieldStyle, marginBottom: '20px' }}/>
            <TextField id="filled-basic" name="password"  label="password"   placeholder="צור סיסמא" variant="filled" value={user.password} onChange={(e) => handleChangeUser(e)} sx={{ ...textFieldStyle, marginBottom: '20px' }}/>
            <TextField id="filled-basic" name="firstName" label="firstname" placeholder="שם פרטי"  variant="filled" value={user.firstName} onChange={(e) => handleChangeUser(e)} sx={{ ...textFieldStyle, marginBottom: '20px' }}/>
            <TextField id="filled-basic" name="lastName" label="lastname" placeholder="שם משפחה" variant="filled" value={user.lastName} onChange={(e) => handleChangeUser(e)} sx={{ ...textFieldStyle, marginBottom: '20px' }}/>
            <span>{error}</span>
            <Button onClick={handleClickSignUp} variant="contained" sx={buttonStyle}>הרשמה </Button>
            <Button onClick={handleClickChefSignUp} variant="contained" sx={buttonStyle}>  הרשמה כשפית  </Button>
         </div> </>
    );
};
export default SignUp;
