import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
export default function MyOrder() {
  const [CartItems, setCartItems] = useState([])
  const [CartActive, setCartActive] = useState(false)
  const errorMessage = () => {
    Swal.fire({
      icon: 'error',
      text: 'You have to login to view your orders. Make sure that you are logged in!',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal-custom-button' // Custom class for the button
      }
    });
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:4000/cart/displayItems-withStatus2", {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response);
      const details = response.data.details;
      setCartItems(details)
      console.log(CartItems);
    }).catch(()=>{
      errorMessage();
    })
  }, [])

  useEffect(() => {
    setCartActive(CartItems !== null && CartItems.length > 0);
  }, [CartItems]);

  return (
    <>
      <div className='my-order'>
        <h1 id='myorder-heading'>MY ORDERS</h1>
      </div>

      {CartActive ? (
        <>
          <h6 id='purchase-heading' style={{ marginTop: 30, marginLeft: 30, marginBottom: 30 }}>The Items You Purchased Recently</h6>
          <Table id='cart-table' striped>
            <thead>
              <tr>
                <th>Category</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Purchased Date</th>
              </tr>
            </thead>
            <tbody>
              {CartItems.map((data) =>
                <>
                  <tr>
                   
                    <td>{data.category}</td>
                    <td><img style={{width:50}} src={`/upload/${data.image}`}></img>{data.itemName}</td>
                    <td>{data.price}</td>
                    <td>{data.date}</td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <h6 className='text-center mb-5 mt-5' style={{ fontSize: "7vh", fontFamily: "Times New Roman",color:'#90949C' }}>No orders recently.</h6>
          <div className='text-center mb-5'><Button id='checkout-btn' ><a className='order-link text-black' href='/order-online'>Order Now</a></Button></div>
           
        </>
      )}



    </>
  )
}
