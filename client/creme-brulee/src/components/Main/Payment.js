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
    const [paypalData,setPaypalData] = useState({
       email:'',
       mobile:'',
       password:'', 
    })
    const [errors, setErrors] = useState({});
    const [textError,setTextError] = useState ({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // null, 'creditCard', or 'paypal'
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (type) => {
        setChecked(type); // Save the selected payment method
        setTimeout(() => {
          if (type === 'paypal') handleOpen();
          if (type === 'creditCard') handleShow();
        }, 300); // Small delay to avoid immediate modal opening
      };
    const handleClose = () => {
      setActiveModal(null); // Close all modals
    };
    
    const handleShow = () => {
      setActiveModal('creditCard'); // Open credit card modal
    };
    
    const handleOpen = () => {
      setActiveModal('paypal'); // Open PayPal modal
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setPaypalData({...paypalData,[name]:value})
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
          } else if (!/^[A-Za-z]+$/.test(formData.firstname)) {
            newErrors.firstname = 'Name must contain only alphabetic letters';
          }

          if (formData.lastname.trim() === '') {
            newErrors.lastname = 'Last name is required';
          } else if (!/^[A-Za-z]+$/.test(formData.lastname)) {
            newErrors.lastname = 'Name must contain only alphabetic letters';
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
            text: 'Your payment has been successfully done!',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'swal-custom-button'
            }
          });
    }

    const errorAlert=()=>{
        Swal.fire({
            icon: 'error', 
            text: 'Your payment has been failed!',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'swal-custom-button'
            }
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
          }).catch((error)=>{
             console.log(error);
             
            errorAlert();
          })

}
}
const validateFields = () => {
    const newErrors = {};
  
    // Email validation
    if (!paypalData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalData.email)) {
      newErrors.email = "Invalid email format";
    }
  
    // Mobile validation
    if (!paypalData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(paypalData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
  
    // Password validation
    if (!paypalData.password) {
      newErrors.password = "Password is required";
    } else if (paypalData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
  
    console.log("Validation errors:", newErrors);
    setTextError(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  

  const handleSubmit = (e)=> {
    console.log('hi');
    
    e.preventDefault();
    console.log("Form data before validation:", paypalData);
    const token=localStorage.getItem('token') 
    if (validateFields())
         {      
        axios.post("http://localhost:4000/cart/payment",paypalData, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          }).then((response) => {
            console.log(response); 
            showAlert();
          }).catch((error)=>{
             console.log(error);
             
            errorAlert();
          })

}

  };


    return (
        <>
            <div >
                <h1 id='payment-heading'>PAYMENT DETAILS</h1>
            </div>
            <div>
                <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 100 }}>Choose Your Payment Method</h6>
                <div className='payment'>
                    <p style={{ marginLeft: 100, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}><Checkbox onChange={() => handleCheckboxChange('paypal')} checked={checked === 'paypal'} />&nbsp;&nbsp;<b>Pay Pal:</b> &nbsp;Safe payment online credit card needed.<img className='paypal-logo' style={{ width: 80, marginLeft:50 }} src='https://www.pngall.com/wp-content/uploads/5/PayPal-Logo-PNG-Picture.png'></img></p>
                </div>
                <div>
                    <p style={{marginBottom:100, marginLeft: 100, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}><Checkbox onChange={() => handleCheckboxChange('creditCard')} checked={checked === 'creditCard'} />&nbsp;&nbsp;<b>Credit Card:</b> &nbsp;Safe money transfer using your bank account.<img className='visa-logo' style={{ width: 100, marginLeft:20 }} src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'></img></p>
                </div>
               
            </div>

            {/*credit-card Modal*/}
            <Modal  show={activeModal === 'creditCard'} onHide={handleClose}>
                <Modal.Header >
                    <h6 id='payment-details' style={{ marginTop: 20, marginLeft: 10 }}>Credit & Debit Cards</h6><img style={{ width: 100, marginLeft: 10 }} src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'></img>
                    <hr></hr>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate >
                        <Row className="mb-3">

                            <h6 id='payment-secure' style={{ marginTop: 5, marginLeft: 10 }}>We don't share the financial details with the merchant</h6>
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 300 }} onChange={handleChange} name='cardNumber' value={formData.cardNumber} type='text' label='Card Number'></TextField><br></br>
                            {errors.cardNumber && <p style={{color:"red"}}>{errors.cardNumber}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='expires' value={formData.expires} type='text' label='Expires'></TextField>
                            {errors.expires && <p style={{color:"red"}}>{errors.expires}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='cvv' value={formData.cvv} type='text' label='CVV'></TextField><br></br>
                            {errors.cvv && <p style={{color:"red"}}>{errors.cvv}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='firstname' value={formData.firstname} type='text' label='First Name'></TextField>
                            {errors.firstname && <p style={{color:"red"}}>{errors.firstname}</p>}
                            <TextField sx={{ marginTop: 2, marginLeft: 2.5, width: 200 }} onChange={handleChange} name='lastname' value={formData.lastname} type='text' label='Last Name'></TextField>
                            {errors.lastname && <p style={{color:"red"}}>{errors.lastname}</p>}
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
            <Modal show={activeModal === 'paypal'} onHide={handleClose}>
                <Modal.Header >
                    <img style={{ width: 180, marginLeft: 130 }} src='https://cdn.icon-icons.com/icons2/2699/PNG/512/paypal_logo_icon_170865.png'></img>
                    <hr></hr>
                </Modal.Header>
                <Modal.Body>
                    <Form className='paypal-form' noValidate >
                        <Row className="mb-3">

                            <h6 id='payment-details' style={{textAlign:'center' }}>Pay with PayPal</h6>
                            <TextField sx={{marginTop:2}} className='payment-inputs' onChange={handleChange} name='email' type='email' label='Email' value={paypalData.email}></TextField>
                            {textError.email && <p style={{color:"red"}}>{textError.email}</p>}
                            <Divider sx={{ marginTop: 2 }}>or</Divider>
                            <TextField sx={{marginTop:2,marginBottom:2}}  className='payment-inputs'  onChange={handleChange} name='mobile' type='tel'value={paypalData.mobile} label='mobile'></TextField>
                            {textError.mobile && <p style={{color:"red"}}>{textError.mobile}</p>}
                            <TextField className='payment-inputs'  onChange={handleChange} name='password' type='password'value={paypalData.password} label='Password'></TextField>
                            {textError.password && <p style={{color:"red"}}>{textError.password}</p>}
                            <p style={{ marginLeft: 2.5, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}><Checkbox variant='outlined' />&nbsp;&nbsp;<b>Stay logged in for faster checkout<HelpOutlineIcon sx={{ fontSize: 20, marginLeft: 1, color: "#3b5999" }} /></b></p>
                        </Row>
                        <Row>
                            <Button id='payment-button' type='submit' onClick={handleSubmit}>Log In</Button>
                            <p style={{ textAlign:'center', paddingTop: 20, color: "cornflowerblue" }} >Having trouble logging in?</p>
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
