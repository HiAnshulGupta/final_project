import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function EditVendorProfile() {
    const [vendor, setvendor] = useState();
    const navigate = useNavigate();
    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        mobile: "",
        address: ""
    };

    const [vendorValues, setVendorValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { id } = useParams();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorValues({ ...vendorValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(vendorValues));
        if (
            formErrors.email != null ||
            formErrors.fullname != null ||
            formErrors.mobile != null ||
            formErrors.password != null ||
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
                email: vendorValues.email,
                password: vendorValues.password,
                mobile: vendorValues.mobile,
                address: vendorValues.address,
            };
            const url = "http://localhost:8080/signup/recruiter";
            const list = await axios.post(url, data);
            console.log(list.data);
        } else {
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

       
        if (!values.password) {
            formErrors.password = "Password is required!";
        } else if (!regex3.test(values.password)) {
            formErrors.password = "This is not a valid Password format!";
        }
        if (!values.email) {
            formErrors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            formErrors.email = "This is not a valid email format!";
        }
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
    const getUser = () => {
        const BASE_URL = `http://localhost:8082/recruiter/${id}`;
        axios.get(BASE_URL)
            .then(response => {
                console.log(response.data);
                setVendorValues(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            Swal.fire({
                icon: "error",
                title: "Login Required",
                text: "please login to stay on this page"
            })
            navigate("/Login");
        }
        else {

            getUser();
        }
    }, []);

    return (
        <div className="edit-form">
            <div className="header-main">
                <p>UPDATE PROFILE</p>
            </div>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    
                    {/* <p className="form-group">
                        <strong>User_Id</strong>
                        {currentUser.id}
                    </p> */}
                    <p className="form-group">
                        <strong>Email:</strong>
                        {currentUser.email}
                    </p>
                    <p className="form-group">
                        <strong>Authorities:</strong>
                        {currentUser.role}
                        {/* {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <span key={index}>{role}</span>
              ))} */}
                    </p>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            // placeholder={recruiter.fullname}
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
                            // placeholder={recruiter.mobile}
                            value={vendorValues.mobile}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.mobile}</p>
                    </div>
                    

                    <div class="form-group">
                        <label htmlFor="location">address *</label>
                        <input
                            type="text"
                            id="location"
                            className="form-control"
                            // placeholder={recruiter.location}
                            value={vendorValues.address}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.location}</p>
                    </div>

                 
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-success">
                            Update and Submit
                        </button>
                        <Button
                            variant="danger"
                            // href={`/profile/${currentUser.id}`}
                            id="return-profile"
                        >
                            Return To Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditVendorProfile;
