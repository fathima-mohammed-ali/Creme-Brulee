import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Form, Table,Button } from 'react-bootstrap'
export default function Checkout() {
    const [CartItems, setCartItems] = useState([])
    const [billingData,setBillingData]= useState({
      firstname:"",
      lastname:"",
      address:"",
      phone:"",
      email:"",
      ordernotes:"",
      event:"",
      theme:"",
      date:"",
      time:"",
      location:"",

    })
    const handleChange=(event)=>{
      const { name, value } = event.target
      setBillingData({ ...billingData, [name]: value })
    }
    const submit =()=>{
      const token = localStorage.getItem('token')
      axios.post("http://localhost:4000/cart/checkout",
      {
        headers: {
          'authorization': `Bearer ${token}`
        }
      },billingData).then((response) => {
        console.log(response); 
      })
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
            <div className='col-12 col-md-12 col-lg-12' id='checkout'>
                <div className='col-lg-6 col-md-6 col-6' id='billing'>
                    <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 75 }}>Billing details</h6>
                    <TextField sx={{ marginTop: 5, marginLeft: 8, width: 550 }} onChange={handleChange} name='firstname' type='text' label='First Name'></TextField><br></br>
                    <TextField sx={{ marginTop: 5, marginLeft: 8, width: 550 }} onChange={handleChange}  name='lastname' type='text' label='Last Name'></TextField><br></br>
                    <TextField sx={{ marginTop: 5, marginLeft: 8, width: 550 }} onChange={handleChange}  name='address' type='text' label='Address'></TextField><br></br>
                    <TextField sx={{ marginTop: 5, marginLeft: 8, width: 550 }} onChange={handleChange}  name='postcode' type='text' label='PostCode'></TextField><br></br>
                    <TextField sx={{ marginTop: 5, marginLeft: 8, width: 550 }} onChange={handleChange}  name='phone' type='tel' label='Phone'></TextField><br></br>
                    <TextField sx={{ marginTop: 5, marginLeft: 8, width: 550 }} onChange={handleChange}  name='email' type='email' label='Email'></TextField>
                </div>
                <div className='col-lg-6 col-md-6 col-6'>
                    <h6 id='billing-heading' style={{ marginTop: 80, marginLeft: 80 }}>Additional information</h6>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label  id='order-notes' style={{marginTop:5,marginLeft:40}}>Order notes (optional)</Form.Label>
                        <Form.Control name='ordernotes' onChange={handleChange}  style={{marginLeft:40,width:500}} as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                <TextField sx={{ marginTop: 2, marginLeft: 5, width: 500 }} onChange={handleChange}  name='event' type='text' label='Event'></TextField><br></br>
                <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange}  name='theme' type='text' label='Theme'></TextField><br></br>
                <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange}  name='date' type='date' ></TextField><br></br>
                <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange}  name='time' type='time' ></TextField><br></br>
                <TextField sx={{ marginTop: 3, marginLeft: 5, width: 500 }} onChange={handleChange}  name='location' type='search' label='Location'></TextField><br></br>
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
          <Button type='submit' onClick={submit} id='checkout-btn'><a id='checkout-link' href='/payment'>PLACE ORDER</a></Button>

          
         
        </div>
   </>
  )
}
