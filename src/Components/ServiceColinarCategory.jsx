import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetAllChefByServiceId } from '../utils/ChefUtil';


const ServiceColinarCategory = () => {
  const [ServiceColinarName, setServiceColinarName] = useState('NNN');
  const [ServiceColinars, setServiceColinars] = useState([]);
  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    GetServiceColinarName()
    console.log(params);
    const fetchServiceColinars= async () => {
      try {
        const ServiceColinarData = await GetAllChefByServiceId(params.serviceId);
        setServiceColinars(ServiceColinarData);

      } catch (error) {
        console.error('Error fetching ServiceColinars:', error);
      }
    };

    fetchServiceColinars();
  }, []);

 
  const GetServiceColinarName = () => {
    console.log(ServiceColinarName)
    switch (params.serviceId) {
      case '1':
        setServiceColinarName("  קייטרינג חלבי")
        break;
      case '2':
        setServiceColinarName(" קייטרינג בשרי ")
        break;
      case '3':
        setServiceColinarName("  עוגות ומארזים ")
        break;
      case '4':
        setServiceColinarName("   מארזי ארוחת בוקר")
        break;
      case '5':
        setServiceColinarName(" אוכל לשבת   ")
        break;

      default:
        break;
    }
  }

  return (
    <div>
      <h2>{ServiceColinarName}</h2>

      {ServiceColinars ? ServiceColinars.map((ServiceColinar) => (
        <div key={ServiceColinar.id}>
          <Link to={`/singleChef/${ServiceColinar.id}`}>
            <h1>{ServiceColinar.firstName}{ServiceColinar.lastName}</h1></Link>
        </div>
        
      )) : <div>opps</div>}
    </div>
  );
};

export default ServiceColinarCategory;
