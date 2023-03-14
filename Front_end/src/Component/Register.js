// import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";

const Register = () => {
  return (
    <div>
      <br />
      <div>
        <Card>
          <Card.Header as="h5">
            Are you a Vendor looking to organize an event?
          </Card.Header>
          <Card.Body>
            <Card.Title>
              you can register yourself here
            </Card.Title>
            <Card.Text>Click below to continue</Card.Text>
            <Button variant="success" href="/RegisterVendor">
              For Vendor
            </Button>
          </Card.Body>
        </Card>
      </div>
      <br />
      <br />
      <div>
        <Card>
          <Card.Header as="h5">
            Are you a Customer looking to host an event
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Get exciting deals on our portal.
            </Card.Title>
            <Card.Text>Click below to continue</Card.Text>
            <Button variant="success" href="/RegisterCustomer">
              For Customer
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Register;
