import { TextField } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import './Main.css'
import React, { useEffect, useState } from 'react'
import { Form, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
export default function Checkout() {
  const [CartItems, setCartItems] = useState([])
  const [billingData, setBillingData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    postcode: "",
    phone: "",
    email: "",
    ordernotes: "",
    event: "",
    theme: "",
    date: "",
    time: "",
    location: "",

  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setBillingData({ ...billingData, [name]: value })
  }
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const validateForm = () => {
    const newErrors = {};

    if (billingData.firstname.trim() === '' || !/^[a-zA-Z]+$/.test(billingData.firstname)) {
      newErrors.firstname = 'First name is required';
    }

    if (billingData.lastname.trim() === '' || !/^[a-zA-Z]+$/.test(billingData.lastname)) {
      newErrors.lastname = 'Last name is required';
    }
    if (billingData.address.trim() === '' || !/^[a-zA-Z]+$/.test(billingData.address)) {
      newErrors.address = 'address is required';
    }
    if (billingData.postcode.trim() === '' || !/^\d+$/.test(billingData.postcode)) {
      newErrors.postcode = 'postcode is required';
    }
    if (billingData.phone.trim() === '' || !/^\d+$/.test(billingData.phone)) {
      newErrors.phone = 'Mobile number is required';
    }

    if (billingData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(billingData.email)) {
      newErrors.email = 'Invalid Email';
    }
    if (billingData.event.trim() === '') {
      newErrors.event = 'Mention the Event'
    }
    if (billingData.theme.trim() === '') {
      newErrors.theme = 'Mention the Theme'
    }
    if (billingData.date.trim() === '') {
      newErrors.date = 'Mention the Date'
    }
    if (billingData.time.trim() === '') {
      newErrors.time = 'Mention the Time'
    }
    if (billingData.location.trim() === '') {
      newErrors.location = 'Mention the Location'
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const isValidEmail = (email) => {
    return /[^\s]*@[a-z0-9.-]*/i.test(email);
  };

  const showAlert = () => {
    Swal.fire({
      icon: 'error',
      text: 'Please Re-Check your details..',
    });
  }
  const placeOrder = () => {
    Swal.fire({
      icon: 'success',
      text: 'Your Order is placed..',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal-custom-button'
      }
    });
  }
  const emptyAlert = () => {
    Swal.fire({
      icon: 'error',
      text: 'Your Cart is empty please add Items to proceed.',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal-custom-button'
      }
    });
  }
  const authAlert = () => {
    Swal.fire({
      icon: 'error',
      text: 'you are not loggin.Make sure that your loggin',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal-custom-button'
      }
    });
  }

  const navigate = useNavigate();

  // Assuming `cartItems` is passed as a prop or accessed via a global state like Redux/Context
  const submit = (e) => {
    e.preventDefault();

    const formIsValid = validateForm();
    console.log(formIsValid);

    const token = localStorage.getItem('token');
    console.log(token);

    setIsSubmit(true);

    if (CartItems.length === 0) {
      // If cart is empty, show an error message and stop further actions
      emptyAlert('Your cart is empty. Please add items to proceed!');
      return;
    }

    if (Object.keys(errors).length === 0 && formIsValid && token) {
      axios
        .post("http://localhost:4000/cart/checkout", billingData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          placeOrder(); // Proceed with order placement
          navigate('/payment'); // Navigate to payment page
        })
        .catch((error) => {
          showAlert(error.message || 'Something went wrong!');
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:4000/cart/view-cart", {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response);
      const details = response.data.details;
      setCartItems(details)
    }).catch(() => {
      authAlert();
    })
  }, [])



  return (
    <>
      {/* <div className='Check-head'>
        <h1 style={{ fontFamily: "'Cambria', 'Cochin', 'Georgia', 'Times', 'Times New Roman', serif" }} id='cart-heading'>CHECKOUT</h1>
      </div>
      <div id='checkout'>
        <div className='billing'>
          <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 75 }}>Billing details</h6>
          <TextField sx={{ marginTop: 5, marginLeft: 5, width: 550 }} onChange={handleChange} name='firstname' type='text' label='First Name'></TextField><br></br>
          {errors.firstname && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.firstname}</p>}
          <TextField sx={{ marginTop: 5, marginLeft: 5, width: 550 }} onChange={handleChange} name='lastname' type='text' label='Last Name'></TextField><br></br>
          {errors.lastname && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.lastname}</p>}
          <TextField sx={{ marginTop: 5, marginLeft: 5, width: 550 }} onChange={handleChange} name='address' type='text' label='Address'></TextField><br></br>
          {errors.address && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.address}</p>}
          <TextField sx={{ marginTop: 5, marginLeft: 5, width: 550 }} onChange={handleChange} name='postcode' type='text' label='PostCode'></TextField><br></br>
          {errors.postcode&& <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.postcode}</p>}
          <TextField sx={{ marginTop: 5, marginLeft: 5, width: 550 }} onChange={handleChange} name='phone' type='tel' label='Phone'></TextField><br></br>
          {errors.phone && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.phone}</p>}
          <TextField sx={{ marginTop: 5, marginLeft: 5, width: 550 }} onChange={handleChange} name='email' type='email' label='Email'></TextField>
          {errors.email && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.email}</p>}
        </div>
        <div className='additional-info'>
          <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 80 }}>Additional information</h6>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label id='order-notes' style={{ marginTop: 5, marginLeft: 40 }}>Order notes (optional)</Form.Label>
              <Form.Control name='ordernotes' onChange={handleChange} style={{ marginLeft: 40, width: 500 }} as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <TextField sx={{ marginTop: 2, marginLeft: 5, width: 500 }} onChange={handleChange} name='event' type='text' label='Event'></TextField><br></br>
          {errors.event && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.event}</p>}
          <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange} name='theme' type='text' label='Theme'></TextField><br></br>
          {errors.theme && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.theme}</p>}
          <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange} name='date' type='date' ></TextField><br></br>
          {errors.date && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.date}</p>}
          <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange} name='time' type='time' ></TextField><br></br>
          {errors.time && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.time}</p>}
          <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange} name='location' type='search' label='Location'></TextField><br></br>
          {errors.location && <p style={{marginLeft:50,marginTop:10, color: "red" }}>error!!..{errors.location}</p>}
        </div>
      </div > 
      <div>
        <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 75 }}>Your order</h6>

        <Table id='cart-table' >
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          <tbody>
            {CartItems.map((data) =>
              <>
                <tr>
                  <td>{data.itemName}</td>
                  <td>{data.quantity}</td>
                  <td>{data.subtotal}</td>
                </tr>
              </>)}
          </tbody>
        </Table>
        <Button className='mb-5' type='submit' onClick={submit} id='checkout-btn'>PLACE ORDER</Button>
      </div> */}

<div className="checkout-container">
<h1 style={{ fontFamily: "'Cambria', 'Cochin', 'Georgia', 'Times', 'Times New Roman', serif",color:'#5E3023' }} id='checkout-heading'>CHECKOUT</h1>
  <div className="checkout-header">
  </div>

  <div className="checkout-sections">
    {/* Billing Details */}
    <div className="billing-details">
    <h6 id='billing-heading' style={{ textAlign:'left' }}>Billing details</h6>
      <TextField fullWidth sx={{marginBottom:3}} onChange={handleChange} name="firstname" label="First Name" />
      {errors.firstname && <p className="error-text">error!!..{errors.firstname}</p>}

      <TextField fullWidth  sx={{marginBottom:3}} onChange={handleChange} name="lastname" label="Last Name" />
      {errors.lastname && <p className="error-text">error!!..{errors.lastname}</p>}

      <TextField fullWidth  sx={{marginBottom:3}} onChange={handleChange} name="address" label="Address" />
      {errors.address && <p className="error-text">error!!..{errors.address}</p>}

      <TextField fullWidth  sx={{marginBottom:3}} onChange={handleChange} name="postcode" label="PostCode" />
      {errors.postcode && <p className="error-text">error!!..{errors.postcode}</p>}

      <TextField fullWidth  sx={{marginBottom:3}} onChange={handleChange} name="phone" label="Phone" />
      {errors.phone && <p className="error-text">error!!..{errors.phone}</p>}

      <TextField fullWidth  onChange={handleChange} name="email" label="Email" />
      {errors.email && <p className="error-text">error!!..{errors.email}</p>}
    </div>

    {/* Additional Information */}
    <div className="additional-info">
    <h6 id='billing-heading' style={{ textAlign:'left' }}>Additional information</h6>
      <Form className='order-notes'>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Order notes (optional)</Form.Label>
          <Form.Control  name="ordernotes" onChange={handleChange} as="textarea" rows={3} />
        </Form.Group>
      </Form>

      <TextField fullWidth   sx={{marginBottom:3,marginTop:3}}onChange={handleChange} name="event" label="Event" />
      {errors.event && <p className="error-text">error!!..{errors.event}</p>}

      <TextField fullWidth   sx={{marginBottom:3}} onChange={handleChange} name="theme" label="Theme" />
      {errors.theme && <p className="error-text">error!!..{errors.theme}</p>}

      <TextField fullWidth  sx={{marginBottom:3}} onChange={handleChange} name="date" type="date" />
      {errors.date && <p className="error-text">error!!..{errors.date}</p>}

      <TextField fullWidth   sx={{marginBottom:3}} onChange={handleChange} name="time" type="time" />
      {errors.time && <p className="error-text">error!!..{errors.time}</p>}

      <TextField fullWidth  className="textfield" onChange={handleChange} name="location" label="Location" />
      {errors.location && <p className="error-text">error!!..{errors.location}</p>}
    </div>
  </div>

  {/* Order Summary */}
  <div className="order-summary">
  <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 75 }}>Your order</h6>
    <Table id='cart-table'>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {CartItems.map((data) => (
          <tr key={data.itemName}>
            <td>{data.itemName}</td>
            <td>{data.quantity}</td>
            <td>{data.subtotal}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Button className='mb-5' type='submit' onClick={submit} id='checkout-btn'>PLACE ORDER</Button>
  </div>
</div>



    </>
  )
}
