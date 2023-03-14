import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'



function CustomerDashboard() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState([]);
  useEffect((id) => {
    
    axios.get('http://localhost:8080/customer/${email}')
    .then(response => {
      setVendor(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

const handleClick = id => {
  console.log(id);
  localStorage.setItem('id', id);
  navigate(`customer/${id}`)
};

return(
<div>
      <h1>Welcome to customer Dashboard</h1>
    
      <div className="vendor-cards">
        {customer.map((customer) => (
          <div
            key={customer.id}
            className={`customer-card`}>
            {/* <Link to="/CustomerServices/${response.data.id}"> */}
            {/* <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYPPDNq4h6X_4N_GJhxhiBCbNmXuQVMKcQw&usqp=CAU"}  */}
            alt={customer.Name} onClick={() => handleClick(customer.id)}
            {/* </Link> */}
            <button onClick={() => handleClick(customer.id)}>
                View Details
              </button>
            <h4>{customer.Name}</h4>
          </div>
        ))}
      </div>
    </div>


)

}

export default CustomerDashboard
