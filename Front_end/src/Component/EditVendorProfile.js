import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function EditVendorProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  
    user: { userid: "", fullname: "", email: "" },
  };

  const [vendorValues, setVendorValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState("");

  function getVendor(id) {
    const BASE_URL = `http://localhost:8080/recruiter/${id}`;
    axios
      .get(BASE_URL)
      .then((response) => {
        setVendorValues(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorValues({ ...vendorValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(vendorValues));
    if (
      formErrors.fullname != null ||
      formErrors.mobile != null ||
      formErrors.address != null
    ) {
      console.log("set is false");
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
    }

    if (isSubmit) {
      let data = {
        fullname: vendorValues.fullname,
        // username: candValues.username,
        // password: candValues.password,
        // email: candValues.email,
        mobile: vendorValues.mobile,
        address: vendorValues.address,
       
        description: vendorValues.description,
      };
      const user = JSON.parse(localStorage.getItem("user"));
      const url = `http://localhost:8082/profileRecEdit/` + user.userId;
      const list = await axios.put(url, data);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: " Profile Updated",
      });
      console.log(list.data);
    } else {
      console.log("Hello Else");
      Swal.fire({
        icon: "error",
        title: "Try again",
        text: "Enter valid details",
      });
    }
  };

  const validate = (values) => {
    const formErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex1 = /[3-9]/;
    //const regex3 = /^[a-zA-Z\\s]*$/i;
    const regex3 = /^[a-zA-z]+([\s][a-zA-Z]+)*$/i;
    const regex2 = /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/i;
    const regex4 = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!values.fullname) {
      formErrors.fullname = "Fullname is required!";
    } else if (!regex3.test(values.fullname)) {
      formErrors.fullname = "This is not a valid Name format!";
    }

    // if (!values.username) {
    //   formErrors.username = "Username is required!";
    // } else if (!regex3.test(values.username)) {
    //   formErrors.username = "This is not a valid Username format!";
    // }
    // if (!values.password) {
    //   formErrors.password = "Password is required!";
    // } else if (!regex3.test(values.password)) {
    //   formErrors.password = "This is not a valid Password format!";
    // }
    // if (!values.email) {
    //   formErrors.email = "Email is required!";
    // } else if (!regex.test(values.email)) {
    //   formErrors.email = "This is not a valid email format!";
    // }

    if (!values.mobile) {
      formErrors.mobile = "Contact number is required!";
    } else if (!regex2.test(values.mobile)) {
      formErrors.mobile = "This is not a valid phoneNo format!";
    }
    
    if (!values.address) {
      formErrors.address = "address is required";
    }
    
    

    return formErrors;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getVendor(user.userId);
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, []);

  return (
    <div className="edit-form">
      <div className="header-main">
        <p>UPDATE PROFILE</p>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <p className="form-group">
            <strong>Email:</strong>
            {currentUser.email}
          </p>

          {/* <p className="form-group">
            <strong>Authorities:</strong>
            {currentUser.role} */}
            {/* {candValues.role &&
              candValues.role.map((role, index) => (
                <span key={index}>{role}</span>
              ))} */}
          {/* </p> */}

          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={vendorValues.fullname}
              onChange={handleChange}
            />
            <p className="text-danger fs-6">{formErrors.fullname}</p>
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              value={vendorValues.mobile}
              onChange={handleChange}
            />
            <p className="text-danger fs-6">{formErrors.mobile}</p>
          </div>
         
           

          <div class="form-group">
            <label htmlFor="location">Current Location *</label>
            <input
              type="text"
              id="location"
              className="form-control"
              name="location"
              value={vendorValues.location}
              onChange={handleChange}
            />
            <p className="text-danger fs-6">{formErrors.address}</p>
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills Required</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              value={vendorValues.skills}
              onChange={handleChange}
            />
            <p className="text-danger fs-6">{formErrors.skills}</p>
          </div>
         
         
         
          <br />
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Update and Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVendorProfile;
