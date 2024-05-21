import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Login } from '../utils/UserUtil';
import { ChefLogin } from '../utils/ChefUtil';
import { useDispatch } from 'react-redux';
import { setConnectedUser } from '../redux/userSlice';
import { setConnectedChef } from '../redux/chefSlice';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // מתבצע בטעינה הראשונית של הקומפוננטה - ולא במעבר בין קישורים
  useEffect(() => {
   console.log("sign In");
  },[]);

  const handleClicksignin = async() => {
    console.log(email);
    let user ={
      email,
      password: password
      
    }
    if(user.firstName == "" || user.lastName == "" || user.email == "" || user.password == ""){
      setError("חובה למלא את כל הנתונים");
      return;
  } 
    await Login(user).then(res => {
      if(res){
        alert("Success");
        dispatch(setConnectedUser(res));
        navigate('/');
      }
      else{
        setError("email or password is no corrcet");
      }
    })
  }
  const handleClickChefsignin = async() => {
    console.log(email);
    let user ={
      email,
      password: password
      
    }
    if(user.firstName == "" || user.lastName == "" || user.email == "" || user.password == ""){
      setError("חובה למלא את כל הנתונים");
      return;
  } 
    await ChefLogin(user).then(res => {
      if(res){
        alert("Success");
        dispatch(setConnectedChef(res));
        navigate('/');
      }
      else{
        setError("email or password is no corrcet");
      }
    })
  }

    return(<>
      
      <div style={containerStyle}> <h1>התחברות</h1>
      <TextField id="filled-basic" label="email" placeholder="הכנס כתובת מייל" variant="filled" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ ...textFieldStyle, marginBottom: '20px' }}/>
      <TextField id="filled-basic" label="password" variant="filled" value={password} onChange={(e) => setPasword(e.target.value)} sx={{ ...textFieldStyle, marginBottom: '20px' }}/>
      <span>{error}</span>
      <br></br>
      <span>עוד לא נרשמת? <Link to="/signUp">להרשמה</Link></span>
      <br></br>
      <Button onClick={handleClicksignin} variant="contained" sx={buttonStyle}> התחברות </Button>
      <Button onClick={handleClickChefsignin} variant="contained" sx={buttonStyle}> התחברות כשפית</Button>
   </div> 
   </>);
}


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
export default SignIn;