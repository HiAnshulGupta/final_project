import React, { useState } from 'react';
import * as emailjs from 'emailjs-com';
import 'aos/dist/aos.css';

import { Laptop } from 'react-bootstrap-icons';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function Contact() {
    const initialValues = { fname: "", email: "", subject: "", message: "" };
    const [ContactData, setContactData] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({ ...ContactData, [name]: value })

    };
    const sendMail = () => {
        const data = {
            fname: ContactData.fname,
            email: ContactData.email,
            subject: ContactData.subject,
            message: ContactData.message
        }
        const url = "http://localhost:8082/contact";
        axios.post(url, data).then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: "success",
                text: "Mail Send Successfully"
            })
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                text: "Mail not Send Successfully"
            })
        })


    };
    return (
        <Form onSubmit={sendMail}>
            <div className="mini-card" data-aos="zoom-in-down" data-aos-duration="1000">
                <header className="header-sub">
                    <h2><strong><Laptop color="black" size={60} /> {' '}Get In Touch With Us</strong></h2>
                </header>
                <div>
                    <label for="name">Name:</label>
                    <input type="text" name="fname" onChange={handleChange} />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="text" name="email" onChange={handleChange} />
                </div>
                <div>
                    <label for="subject">Subject:</label>
                    <input type="text" name="subject" onChange={handleChange} />
                </div>
                <div>
                    <label for="subject">Message:</label>
                    <textarea name="message" placeholder="Enter Your Message" onChange={handleChange} />
                </div>
                <br />
                <div>
                    <button type="submit" className="btn btn-outline-success">Send Email</button>
                </div>
            </div>
        </Form>
    )
}

export default Contact