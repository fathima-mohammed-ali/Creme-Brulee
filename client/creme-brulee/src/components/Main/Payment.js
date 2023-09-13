import { Checkbox, Divider, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormCheck, Modal, Row } from 'react-bootstrap'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Swal from 'sweetalert2'
import axios from 'axios';

export default function Payment() {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expires: '',
        cvv: '',
        firstname: '',
        lastname: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [show, setShow] = useState(false);
    const [Open, setOpen] = useState(false);
    const handleClose = () => {
        setShow(false);
        setOpen(false);
    }
    const handleShow = () => {
        setShow(true);
        setOpen(false);
    }
    const handleOpen = () => {
        setShow(false);
        setOpen(true);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const validateForm = () => {
        const newErrors = {};

        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'card number is required';
        } else if (!isValidCreditCard(formData.cardNumber)) {
            newErrors.cardNumber = 'Invalid card number';
        }

        if (formData.expires.trim() === '') {
            newErrors.expires = 'Expiration date is required';
        } else if (!isValidExpirationDate(formData.expires)) {
            newErrors.expires = 'Invalid expiration date';
        }

        if (formData.cvv.trim() === '') {
            newErrors.cvv = 'CVV is required';
        } else if (!isValidCVV(formData.cvv)) {
            newErrors.cvv = 'Invalid CVV';
        }
        if (formData.firstname.trim() === '') {
            newErrors.firstname = 'First name is required';
        }

        if (formData.lastname.trim() === '') {
            newErrors.lastname = 'Last name is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const isValidCreditCard = (cardNumber) => {
        return /^\d{10}$/.test(cardNumber);
    };
    const isValidExpirationDate = (expires) => {
        const parts = expires.split('/');
        if (parts.length !== 2) {
            return false;
        };
        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the current year
        return month >= 1 && month <= 12 && year >= currentYear && year <= currentYear + 20;
    };
    const isValidCVV = (cvv) => {
        return /^\d{3,4}$/.test(cvv);
    };
    
    const showAlert=()=>{
        Swal.fire({
            icon: 'success', 
            title: 'Success!',
            text: 'Your payment has been done successfully!',
          });
    }
    
    const submit = (e) => {
        console.log("hi");
        e.preventDefault();
        const formIsValid = validateForm();
        console.log(formIsValid);
        const token=localStorage.getItem('token')
        console.log(token);
        setIsSubmit(true)
        if (Object.keys(errors).length == 0 && formIsValid) {
        axios.post("http://localhost:4000/cart/payment",formData, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          }).then((response) => {
            console.log(response); 
            showAlert();
          })

}
}

    return (
        <>
            <div >
                <h1 id='payment-heading'>PAYMENT DETAILS</h1>
            </div>
            <div>
                <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 100 }}>Choose Your Payment Method</h6>
                <div className='payment'>
                    <p style={{ marginLeft: 100, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}><Checkbox onClick={handleOpen} variant='outlined' />&nbsp;&nbsp;<b>Pay Pal:</b> &nbsp;Safe payment online credit card needed.<img style={{ width: 100, marginLeft: 500 }} src='https://www.pngall.com/wp-content/uploads/5/PayPal-Logo-PNG-Picture.png'></img></p>
                </div>
                <div>
                    <p style={{ marginLeft: 100, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}><Checkbox onClick={handleShow} variant='outlined' />&nbsp;&nbsp;<b>Credit Card:</b> &nbsp;Safe money transfer using your bank account.<img style={{ width: 100, marginLeft: 440 }} src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'></img></p>
                </div>
                <hr></hr>
            </div>

            {/*credit-card Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <h6 id='payment-details' style={{ marginTop: 20, marginLeft: 10 }}>Credit & Debit Cards</h6><img style={{ width: 100, marginLeft: 10 }} src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'></img>
                    <hr></hr>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate >
                        <Row className="mb-3">

                            <h6 id='payment-secure' style={{ marginTop: 5, marginLeft: 10 }}>We don't share the financial details with the merchant</h6>
                            {/* <InputLabel style={{ marginTop: 5, marginLeft: 20 }}>Country/Region</InputLabel>
                            <Select
                                id="payment-secure"
                                value={formData.countryRegion}
                                name='countryRegion'
                                label="Country/Region"
                                onChange={handleChange}
                                sx={{ width: 418, marginLeft: 2.5 }}
                            >
                                <MenuItem >India</MenuItem>
                                <MenuItem >United Arab Emirates</MenuItem>
                                <MenuItem >Kingdom of Saudi Arabia</MenuItem>
                                <MenuItem >United States</MenuItem>
                                <MenuItem >Canada</MenuItem>
                            </Select> */}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 418 }} onChange={handleChange} name='cardNumber' value={formData.cardNumber} type='text' label='Card Number'></TextField><br></br>
                            {errors.cardNumber && <p style={{color:"red"}}>error!!..{errors.cardNumber}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='expires' value={formData.expires} type='text' label='Expires'></TextField>
                            {errors.expires && <p style={{color:"red"}}>error!!..{errors.expires}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='cvv' value={formData.cvv} type='text' label='CVV'></TextField><br></br>
                            {errors.cvv && <p style={{color:"red"}}>error!!..{errors.cvv}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='firstname' value={formData.firstname} type='text' label='First Name'></TextField>
                            {errors.firstname && <p style={{color:"red"}}>error!!..{errors.firstname}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='lastname' value={formData.lastname} type='text' label='Last Name'></TextField>
                            {errors.lastname && <p style={{color:"red"}}>error!!..{errors.lastname}</p>}
                        </Row>
                        <Row>
                            <p style={{ marginLeft: 2.5, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}><Checkbox variant='outlined' />&nbsp;&nbsp;<b>Ship to my billing address</b></p>
                            <Button id='payment-button' color='primary' onClick={submit}>Continue</Button>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*paypal modal*/}
            <Modal show={Open} onHide={handleClose}>
                <Modal.Header >
                    <img style={{ width: 180, marginLeft: 130 }} src='https://cdn.icon-icons.com/icons2/2699/PNG/512/paypal_logo_icon_170865.png'></img>
                    <hr></hr>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate >
                        <Row className="mb-3">

                            <h6 id='payment-details' style={{ marginTop: 5, marginLeft: 130 }}>Pay with PayPal</h6>
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 418 }} onChange={handleChange} name='email' type='email' label='Email'></TextField><br></br>
                            <Divider sx={{ marginTop: 2 }}>or</Divider>
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 418 }} onChange={handleChange} name='email' type='tel' label='Mobile Number'></TextField><br></br>
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 418 }} onChange={handleChange} name='password' type='text' label='Password'></TextField>
                            <p style={{ marginLeft: 2.5, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}><Checkbox variant='outlined' />&nbsp;&nbsp;<b>Stay logged in for faster checkout<HelpOutlineIcon sx={{ fontSize: 20, marginLeft: 1, color: "#3b5999" }} /></b></p>
                        </Row>
                        <Row>
                            <Button id='payment-button'>Log In</Button>
                            <p style={{ marginLeft: 150, paddingTop: 20, color: "cornflowerblue" }} >Having trouble logging in?</p>
                            <Divider sx={{ marginTop: 2, marginBottom: 2 }}>or</Divider>
                            <Button id='debit-button'>Pay with Debit or Credit Card</Button>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
