import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

function EditCustomerProfile(props) {
    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        mobile: "",
        address: ""
    };

    const [customerValues, setCustomerValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState("");
    const currentUser = JSON.parse(localStorage.getItem('user'));
    // const [currentCandidate, setcurrentCandidate] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerValues({ ...customerValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        console.log("handlesubmit" + customerValues.fullname);
        e.preventDefault();
        setFormErrors(validate(customerValues));
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

        //         if (Object.keys(formErrors).length === 0) {
        if (isSubmit) {
            let data = {
                // userid: customerValues.userid,
                fullname: customerValues.fullname,
                // password: customerValues.password,
                // email: customerValues.email,
                mobile: customerValues.mobile,
                address: customerValues.address,
            };
            const user = JSON.parse(localStorage.getItem("user"));
            const url = "http://localhost:8080/profileCandedit/" + user.userId;
            const list = await axios.put(url, data);
            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Profile Updated Sucessfully",
            });
            console.log(list.data);
        } else if (isSubmit === false) {
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
            formErrors.fullname = "Fullname name is required!";
        } else if (!regex3.test(values.fullname)) {
            formErrors.fullname = "This is not a valid Name format!";
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

    function getCustomer(id) {
        const BASE_URL = `http://localhost:8080/customer/${id}`;
        axios
            .get(BASE_URL)
            .then((response) => {
                setCustomerValues(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        getCustomer(user.userId);
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
                        <strong>User Name:</strong>
                        {currentUser.username}
                    </p>
                    <p className="form-group">
                        <strong>UserId:</strong>
                        {currentUser.candId}
                    </p>
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
                            name="fullname"
                            value={customerValues.fullname}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.fullname}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="mobile"
                            value={customerValues.mobile}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.mobile}</p>
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <input
                            type="radio"
                            value="male"
                            name="gender"
                            onChange={handleChange}
                        />
                        Male
                        <input
                            type="radio"
                            value="female"
                            name="gender"
                            onChange={handleChange}
                        />
                        Female
                        <input
                            type="radio"
                            value="others"
                            name="gender"
                            onChange={handleChange}
                        />
                        Others
                        <p className="text-danger fs-6">{formErrors.gender}</p>
                    </div> */}

                    <div class="form-group">
                        <label htmlFor="location">Current Address *</label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            // placeholder={recruiter.location}
                            value={customerValues.address}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.address}</p>
                    </div>

                    
                    <br />
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-success"
                        //   onClick={this.updateCandidate}
                        >
                            Update and Submit
                        </button>
                        <Button
                            variant="danger"
                            //   href={`/profile/${currentUser.id}`}
                            name="return-profile"
                        >
                            Return To Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCustomerProfile;
