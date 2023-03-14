
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "react-validation/build/input";

function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { email, password };
    axios
      .post("http://localhost:8080/customer/signin", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        // Save the JWT token to local storage
        localStorage.setItem("token", response.data.email);
        // Redirect to the dashboard
        const custId = response.data.email;
        console.log(custId);
        navigate("/CustomerDashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Login as Customer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>

        
      </Form>
    </div>
  );
}

export default CustomerLogin;
