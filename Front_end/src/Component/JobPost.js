import React, { useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Text from "react-validation/build/textarea";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function JobPost() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const initialValues = { jobTitle: "", jobVacancy: "", reqExp: "", jobType: "", jobLocation: "", jobSalary: "", jobDescription: "" }
    const [jobValues, setJobValues] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobValues({ ...jobValues, [name]: value })
    }

    const createJob = (e) => {
        const id = currentUser.userId;
        e.preventDefault();
        const data = {
            jobTitle: jobValues.jobTitle,
            jobVacancy: jobValues.jobVacancy,
            reqExp: jobValues.reqExp,
            jobType: jobValues.jobType,
            jobLocation: jobValues.jobLocation,
            jobSalary: jobValues.jobSalary,
            jobDescription: jobValues.jobDescription

        }
        console.log(data);
        axios.post(`http://localhost:8082/post/job/${id}`, data).then((response) => {
            const mess = response.data.message;
            Swal.fire({
                icon: "success",
                title: "Job Post",
                text: "JOb crated Successfully"
            })
            navigate("/RecruiterDashboard");
        }).catch((error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            Swal.fire({
                icon: "error",
                title: "Job Post",
                text: "error while posting try again"
            })
        }
        )

    };
    return (
        <div>
            <div className="card">
                <div className="header-text">
                    <p>Create A New Job</p>
                </div>
                <Form onSubmit={createJob} >
                    <div>
                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="jobTitle"
                                value={jobValues.jobTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobVacancy">Approximate Vacancies</label>
                            <Input
                                type="number"
                                className="form-control"
                                name="jobVacancy"
                                value={jobValues.jobVacancy}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="form-group">
                            <label htmlFor="reqExp">Experience Required </label>
                            <Input
                                type="number"
                                className="form-control"
                                name="reqExp"
                                value={jobValues.reqExp}
                                onChange={handleChange}
                            />
                            {/* <select
                                    id="reqExp"
                                    className="form-control"
                                    value={jobValues.reqExp}
                                    onChange={handleChange}
                                > */}
                            {/* <option value="" disabled selected>--Select Years Of Experience Required--</option>
                                    <option value="0">0 Year</option>
                                    <option value="1">1 Year</option>
                                    <option value="2">2 Years</option>
                                    <option value="3">3 Years</option>
                                    <option value="4">4 Years</option>
                                    <option value="5">5 Years</option>
                                    <option value="6">6 Years</option>
                                    <option value="7">7 Years</option>
                                    <option value="8">8 Years</option>
                                </select> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobType">Job Type</label>
                            <input
                                type="radio"
                                value="Full-Time"
                                name="jobType"
                                checked={jobValues.jobType === "Full-Time"}
                                onChange={handleChange}
                            />Full-Time
                            <input
                                type="radio"
                                value="Part-Time"
                                name="jobType"
                                checked={jobValues.JobType === "Part-Time"}
                                onChange={handleChange}
                            />Part-Time
                            <input
                                type="radio"
                                value="Internship"
                                name="jobType"
                                checked={jobValues.JobType === "Internship"}
                                onChange={handleChange}
                            />Internship
                            <input
                                type="radio"
                                value="Work From Home"
                                name="jobType"
                                checked={jobValues.JobType === "Work From Home"}
                                onChange={handleChange}
                            />Work From Home
                        </div>
                        <div class="form-group">
                            <label htmlFor="jobLocation">Job Location</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="jobLocation"
                                value={jobValues.jobLocation}
                                onChange={handleChange}
                            />
                            {/* <select
                                    id="jobLocation"
                                    className="form-control"
                                    value={jonValues.jobLocation}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled selected>--Select The Job Location--</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Australia">Algeria</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Chile">Chile</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="India">India</option>
                                    <option value="Poland">Poland</option>
                                    <option value="UAE">UAE</option>
                                    <option value="USA">USA</option>
                                </select> */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="jobSalary">Offered Salary Package (in CTC)</label>
                            <Input
                                type="number"
                                className="form-control"
                                name="jobSalary"
                                value={jobValues.jobSalary}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobDescription">Job Description </label>
                            <Text
                                className="form-control"
                                name="jobDescription"
                                value={jobValues.jobDescription}
                                onChange={handleChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Create Job Post</button>
                            <Button variant="danger" href="/RecruiterDashboard">Return To Dashboard</Button>
                        </div>

                    </div>

                    {/* <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    /> */}
                </Form>
            </div>
        </div>
    )
}

export default JobPost

