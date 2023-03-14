import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const initialValues = {  //vendor
        id: "", fullname: "", mobile: "",  address: "",
        user: { userid: "", username: "", email: "" }
    };
    const initialValues1 = {  //customer
        id: null, fullname: "", mobile: "", address: "",
        user: { userid: null, username: "", email: "" }
    };
    const [currentUser, setCurrentUser] = useState({});
    const [showVendor, setVendor] = useState(false);
    const [showCustomer, setCustomer] = useState(false);
    const [currentVendor, setCurrentVendor] = useState(initialValues);
    const [currentCustomer, setCurrentCustomer] = useState(initialValues1);
    const navigate = useNavigate();



    function getVendor(id) {

        const BASE_URL = `http://localhost:8080/vendor/${id}`;
        axios.get(BASE_URL)
            .then(response => {
                // console.log(response.data);
                setCurrentVendor(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getCustomer(id) {
        const BASE_URL = `http://localhost:8080/customer/${id}`;
        axios.get(BASE_URL)
            .then(response => {
                // console.log(response.data);
                setCurrentCustomer(response.data);
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
            // console.log("props is");
            // console.log(props);
            const user = JSON.parse(localStorage.getItem('user'));
            // console.log(user);
            if (user) {

                setCurrentUser(user);
                setVendor(user.role === "Vendor");
                setCustomer(user.role === "Candidate");
            };
            if (user.role === "Customer") {
                getCustomer(user.userId);
            }
            if (user.role === "Vendor") {
                getVendor(user.userId);
            }

        }
    }, []
    );
    return (
        <div className="profile">
            <div className="header-main">
                <p>PROFILE</p>
            </div>
            <div className="card">

                {showVendor && (
                    <div className="form-group">
                        <header className="header-sub">
                            <h1>
                                <u><strong>Welcome {currentVendor.fullname}</strong></u>
                            </h1>
                        </header>
                        <br />
                        <Table>
                            <Table.Body>
                                <div className="header-sub">Basic Details</div>
                                <Table.Row>
                                    <Table.HeaderCell>Application No:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentUser.VendorId}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Email:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentUser.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Full Name:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentVendor.fullname}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Mobile Number:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentVendor.mobile}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Address:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentVendor.address}</Table.Cell>
                                </Table.Row>
                                
                                <br />
                                
                            </Table.Body>
                        </Table>
                        <br />
                        <div>
                            <Button variant="success" href={`/EditVendor/${currentUser.userId}`}>Edit Profile</Button>
                        </div>
                    </div>
                )}
                {showCustomer && (
                    <div className="form-group">
                        <header className="header-text">
                            <h1>
                                <strong>Welcome {currentCustomer.fullname}</strong>
                            </h1>
                        </header>
                        <br />
                        <Table>
                            <Table.Body>
                                <div className="header-sub">Basic Details</div>
                                
                                <Table.Row>
                                    <Table.HeaderCell>Email:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentUser.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Full Name:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentCustomer.fullname}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Mobile Number:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentCustomer.mobile}</Table.Cell>
                                </Table.Row>
                                
                                <Table.Row>
                                    <Table.HeaderCell>Current address:{" "}</Table.HeaderCell>
                                    <Table.Cell>{currentCustomer.address}</Table.Cell>
                                </Table.Row>
                                                                
                            </Table.Body>
                        </Table>
                        <br />
                        <div>
                            <Button variant="success" href={`/EditCustomer/${currentUser.userId}`}>Edit Profile</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile