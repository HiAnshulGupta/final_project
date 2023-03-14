import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'



function VendorDashboard() {
  const navigate = useNavigate();

  const [vendors, setVendor] = useState([]);
  useEffect(() => {
    const id=localStorage.getItem('id');
    console.log(id+"ok id")
    axios.get('http://localhost:8080/vendor/{id}')
    .then(response => {
      console.log(response.data);
      setVendor(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

const handleClick = id => {
  console.log(id);
  localStorage.setItem('id', id);
  console.log(localStorage.getItem())
  navigate(`vendor/${id}`)
};

return(
<div>
      <h1>Welcome to Vendor Dashboard</h1>
      <h3>Select a Vendor to browse services:</h3>
      <div className="vendor-cards">
          {/* {vendors.map(vendor=>(
               <div key={vendor.email}>
                
               </div>
          ))} */}
          <h4>Vendor Name : {vendors.name}</h4>

         <h4>Vendor Email : {vendors.email}</h4>
         <h4>Contact No : {vendors.contactNumber}</h4>
         <h4>Vendor Address : {vendors.Address}</h4>
         
         {/* <h4>{vendors.eventList.id}</h4> */}

          {/* {vendors.eventList.map ((vendor)=>( 
            <div key={vendor.id}>
            <h4>Contact No : {vendor.id}</h4>
            </div>
             ))} */}


        {/* {vendors.map(vendor => ( */}
          {/* <div key={vendor.email}
            className={`vendor-card`}> */}
            {/* <Link to="/CustomerServices/${response.data.id}"> */}
            {/* <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYPPDNq4h6X_4N_GJhxhiBCbNmXuQVMKcQw&usqp=CAU"} 
            alt={vendor.email} onClick={() => handleClick(vendor.id)}></img> */}
            {/* </Link> */}
            {/* <button onClick={() => handleClick(vendor.id)}>
                View Services
              </button>
            <h4>{vendor.email}</h4>
          </div> */}
        {/* ))} */}
      </div>
    </div>


)

}

export default VendorDashboard
