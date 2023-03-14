
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterCustomer() {
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [password, setpassword] = useState("");
  const [Address, setAddress] = useState("");


  const handleClick = (e) => {
    e.preventDefault();
    const customer = { Name, email, contactNumber, password, Address };
    console.log(customer);
    axios
      .post("http://localhost:8080/customer", customer, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        console.log("New customer added");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter  Name"
            required
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your  name.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNo">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone No"
            required
            value={contactNumber}
            onChange={(e) => setcontactNumber(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your phone number.
          </Form.Control.Feedback>
        </Form.Group>
        {/* <Address></Address> */}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Full Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            required
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          Already Registered? <Link to="/login">Sign in</Link>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterCustomer;