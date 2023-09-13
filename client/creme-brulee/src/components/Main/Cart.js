import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';
export default function Cart() {
  const [CartItems, setCartItems] = useState([])
  const [CartActive, setCartActive] = useState(false)
  const [Quantity, setQuantity] = useState(1)
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
      console.log(CartItems);
    })
  }, [])

  useEffect(() => {
    setCartActive(CartItems !== null && CartItems.length > 0);
  }, [CartItems]);

  const handleDelete = (id) => {
    axios.post(`http://localhost:4000/cart/delete/${id}`).then((response) => {
      console.log(response);
    })
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  }
  const quantityAdd = (id) => {
    const newQuantity = Quantity + 1;
    setQuantity(newQuantity);
    axios.get(`http://localhost:4000/cart/quantity-add-cart/${id}`).then((response) => {
      console.log(response);
      window.location.reload()
    })
  }
  const quantityMinus = (id) => {
    if (Quantity > 1) { // Ensure quantity doesn't go below 1
      const newQuantity = Quantity - 1;
      setQuantity(newQuantity);
      axios.get(`http://localhost:4000/cart/quantity-minus-cart/${id}`).then((response) => {
        console.log(response);
        window.location.reload()
      })
    }
  }
  const navigate= useNavigate()
  const ToMyOrder=()=>{
      navigate('/my-order')
  }
  return (
    <>
      <div className='cart'>
        <h1 id='cart-heading'>CART</h1>
      </div>
      <div>
        {CartActive ? (
          <>

            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {CartItems.map((data) =>
                  <>
                    <tr>
                      <td><Button variant='outline' onClick={() => { handleDelete(data._id) }}><ClearIcon /></Button></td>
                      <td><img style={{width:50}} src={`/upload/${data.image}`}></img>{data.itemName}</td>
                      <td>{data.price}</td>
                      <td><TextField size='small' sx={{ width: 100, marginRight: 5 }} value={data.quantity} onChange={handleQuantityChange} variant="outlined" />
                        <ButtonGroup className="sm">
                          <Button onClick={() => { quantityAdd(data._id) }}>+</Button>
                          <Button onClick={() => { quantityMinus(data._id) }}>-</Button>
                        </ButtonGroup>
                      </td>
                      <td>{data.subtotal}</td>
                    </tr>
                    <tr>
                        {/* <td colSpan={5}>{data.grandTotal}</td>  */}
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
            {/* <h6 style={{ fontSize: "7vh", fontFamily: "Times New Roman", marginTop: 30, marginLeft: 30 }}>Cart total</h6> */}
           <Button id='checkout-btn'><a id='checkout-link' href='/checkout'>PROCEED TO CHECKOUT</a></Button>

          </>
        ) : (
          <>
            <h6 className='text-center' style={{ fontSize: "7vh", fontFamily: "Times New Roman", marginTop: 100, }}>Your cart is currently empty.</h6>
           
          </>
        )}
 <Button id='cart-btn' onClick={ToMyOrder}>MY ORDERS</Button>
      </div>


    </>
  )
}
