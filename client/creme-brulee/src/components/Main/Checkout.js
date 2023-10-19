import { TextField } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import { Form, Table, Button } from 'react-bootstrap'
export default function Checkout() {
  const [CartItems, setCartItems] = useState([])
  const [billingData, setBillingData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    postcode:"",
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

    if (billingData.firstname.trim() === '') {
      newErrors.firstname = 'First name is required';
    }

    if (billingData.lastname.trim() === '') {
      newErrors.lastname = 'Last name is required';
    }
    if (billingData.address.trim() === '') {
      newErrors.address = 'address is required';
    }
    if (billingData.postcode.trim() === '') {
      newErrors.postcode = 'postcode is required';
    }
    // }else if (!isValidCode(billingData.postcode)) {
    //   newErrors.postcode = 'Invalid Postcode';
    // }
    if (billingData.phone.trim() === '') {
      newErrors.phone = 'Mobile number is required';
    }
    // } else if (!ValidNumber(billingData.phone)) {
    //   newErrors.phone = 'Invalid Mobile number';
    // }
    if (billingData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(billingData.email)) {
      newErrors.email = 'Invalid Email';
    }
    if(billingData.event.trim()===''){
      newErrors.event='Mention the Event'
    }
    if(billingData.theme.trim()===''){
      newErrors.theme='Mention the Theme'
    }
    if(billingData.date.trim()===''){
      newErrors.date='Mention the Date'
    }
    if(billingData.time.trim()===''){
      newErrors.time='Mention the Time'
    }
   if (billingData.location.trim()===''){
    newErrors.location='Mention the Location'
   }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  // const ValidNumber = (phone) => {
  //   if (phone.length !== 10) {
  //     return false;
  //   }
  // }
  const isValidEmail = (email) => {
    return /[^\s]*@[a-z0-9.-]*/i.test(email);
  };
  // const isValidCode=(postcode)=>{
  //   if(postcode.length!==6){
  //      return false
  //   }
  // }
  const showAlert=()=>{
    Swal.fire({
        icon: 'error', 
        title: 'OOps!',
        text: 'Please Re-Check your details..',
      });
}
  const submit = (e) => {
    e.preventDefault();
    const formIsValid = validateForm();
    console.log(formIsValid);
    const token = localStorage.getItem('token')
    console.log(token);
    setIsSubmit(true)
    if (Object.keys(errors).length == 0 && formIsValid && token) {
    axios.post("http://localhost:4000/cart/checkout",billingData,
      {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response);
      }).catch((error)=>{
        showAlert(error);
    })
  }
}
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
    })
  }, [])
 
 

  return (
    <>
      <div className='cart'>
        <h1 id='cart-heading'>CHECKOUT</h1>
      </div>
      <div id='checkout'>
        <div id='billing'>
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
        <div>
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

        <Table>
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
        <Button className='mb-5' type='submit' onClick={submit} id='checkout-btn'><a id='checkout-link' href='/payment'></a>PLACE ORDER</Button>



      </div>
    </>
  )
}
