import '../CSS/HPcss.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';


const SrviceColinar = () => {
  

  const navigate = useNavigate();

  const handleClickServiceColinar = (url) => {
      navigate(url);
  };

    return (
     <div className='containerStyle'>
      <center>


          <button className='button-style' onClick={() => handleClickServiceColinar(`/serviceColinarCategory/${1}`)}> קייטרינג חלבי </button>
          <button className='button-style' onClick={() => handleClickServiceColinar(`/serviceColinarCategory/${2}`)}>קייטרינג בשרי </button>
          <button className='button-style' onClick={() => handleClickServiceColinar(`/serviceColinarCategory/${3}`)}> עוגות ומארזי מתוקים </button>
          <button className='button-style' onClick={() => handleClickServiceColinar(`/serviceColinarCategory/${4}`)}>  מארזי ארוחת בוקר</button>
          <button className='button-style' onClick={() => handleClickServiceColinar(`/serviceColinarCategory/${5}`)}>אוכל לשבת</button>
          </center>
  </div>
    );
};



export default SrviceColinar;
