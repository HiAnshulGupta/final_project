import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarTodayTwoTone } from "@mui/icons-material";

function EditCustomerProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [customer, setcustomer] = useState("")
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const initialValues = {
        fullname: customer.fullname,
        email: customer.email,
        password: customer.password,
        mobile: customer.mobile,
        address: customer.address,
    };

    const [customerValues, setCustomerValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerValues({ ...customerValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(customerValues));
        if (
            // formErrors.email != null ||
            formErrors.fullname != null ||
            // formErrors.username != null ||
            formErrors.mobile != null ||
            formErrors.password != null ||
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
                fullname: customerValues.fullname,
                email: currentUser.email,
                password: customerValues.password,
                mobile: customerValues.mobile,
                address: customerValues.address,
               
            };
            const url = `http://localhost:8080/profileCandedit/${currentUser.candId}`;
            axios.put(url, data).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });

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


        if (!regex3.test(values.fullname)) {
            formErrors.fullname = "This is not a valid Name format!";
        }

        if (!regex4.test(values.password)) {
            formErrors.username = "This is not a valid Password format!";
        }
        if (!regex2.test(values.mobile)) {
            formErrors.mobile = "This is not a valid phoneNo format!";
        }
        if (!values.gender) {
            formErrors.gender = "Gender required";
        }
        if (!values.location) {
            formErrors.address = "address is required";
        }

        return formErrors;
    };

    const getUser = () => {
        const BASE_URL = `http://localhost:8082/candidate/${id}`;
        axios.get(BASE_URL)
            .then(response => {
                console.log(response.data);
                setCustomerValues(response.data);
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
            console.log(formErrors);
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                console.log("candValuesinForm", candValues);
            }
            console.log("cand", candidate);
            console.log("currentUser", currentUser);
            console.log("CandValueinUseEffect", candValues);
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
                        <strong>Application No:</strong>
                        {candValues.candid}
                    </p>
                    <p className="form-group">
                        <strong>Email:</strong>
                        {currentUser.email}
                    </p>
                    <p className="form-group">
                        <strong>Authorities:</strong>
                        {currentUser.role
                            //  && currentUser.roles.map((role, index) => (
                            //     <span key={index}>{role}</span>
                            //   ))
                        }
                    </p>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            value={candValues.fullname}
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
                            value={candValues.mobile}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.mobile}</p>
                    </div>
                    <div className="form-group">
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
                    </div>

                    <div class="form-group">
                        <label htmlFor="location">Current Location</label>
                        <input
                            type="text"
                            id="location"
                            className="form-control"
                            // placeholder={recruiter.location}
                            value={candValues.location}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.location}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="skills">Skills Required</label>
                        <input
                            type="text"
                            className="form-control"
                            id="skills"
                            value={candValues.skills}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.skills}</p>
                    </div>
                    <div class="form-group">
                        <label htmlFor="hqual">Highest Qualification *</label>
                        <input
                            id="hqual"
                            className="form-control"
                            value={candValues.hqual}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.hqual}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="major">Specialization/Major </label>
                        <input
                            type="text"
                            className="form-control"
                            name="major"
                            value={candValues.major}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.major}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="institute">University/School *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="institute"
                            value={candValues.institute}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.institute}</p>
                    </div>
                    <div class="form-group">
                        <label htmlFor="yoq">Year Of Qualification *</label>
                        <input
                            id="yoq"
                            className="form-control"
                            value={candValues.yoq}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.yoq}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="marks">Percentage Of Marks *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="marks"
                            value={candValues.marks}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.marks}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exp">Do you have work experience? *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="exp"
                            value={candValues.exp}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.exp}</p>
                    </div>
                    <div class="form-group">
                        <label htmlFor="yoexp">Year Of Experience *</label>
                        <input
                            id="yoexp"
                            className="form-control"
                            value={candValues.yoexp}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.yoexp}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="company"
                            value={candValues.company}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.company}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="foexp">Field Of Expertize</label>
                        <input
                            type="text"
                            className="form-control"
                            name="foexp"
                            value={candValues.foexp}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.foexp}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Other Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={candValues.description}
                            onChange={handleChange}
                        />
                        <p className="text-danger fs-6">{formErrors.description}</p>
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

export default EditCustomerProfile;