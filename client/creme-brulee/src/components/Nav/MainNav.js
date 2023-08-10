import React from 'react'
import { useState } from 'react';
import { Button, Navbar, Nav, Container, Row, Col, NavbarBrand, Modal, Form, InputGroup, FormCheck, ModalBody } from 'react-bootstrap';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from 'axios'

import './Nav.css'
export default function MainNav() {
  const [show, setShow] = useState(false);
  const[open,setOpen]= useState(false);
  const[loginInfo,setLoginInfo] = useState({
    username:"",
    password:"",
})
const[userInfo,setUserInfo]= useState({
  email:"",
})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const inputChange = (event) => {
    const { name, value } = event.target
    setUserInfo({ ...userInfo, [name]: value })
    setLoginInfo({...loginInfo,[name]:value})
}

  const registerSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();

    axios.post("http://localhost:4000/register/user",userInfo).then((response)=>{
        console.log(response);
      })
    }

    setValidated(true);
  }
  const loginSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      console.log(loginInfo);
      axios.post("http://localhost:4000/login/user-login",loginInfo).then((response)=>{
      
        console.log(response);
        if(response.data.role=='user'){
          localStorage.setItem('token',response.data.token)
        }
      })
    }
    setValidated(true);
  }
  const openRegister=()=>{
    setShow(false)
    setOpen(true)
  }
  const openLogin=()=>{
    setShow(true)
    setOpen(false)
  }
  const actionClose=()=>setOpen(false)
  return (
    <>
      <Navbar expand='lg' fixed='top' className='nav-style' data-bs-theme="dark">
        <Container className='flex-navContainer'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand id='home-bar' href="/">Home</Navbar.Brand>
            <Navbar.Brand id='portfolio-bar' href="/profile">Portfolio</Navbar.Brand>
            <Navbar.Brand id='blog-bar' href="/blog" >Blog</Navbar.Brand>
            <Navbar.Brand id='shop-bar' href="/">Shop</Navbar.Brand>
          </Navbar.Collapse>
          <Navbar.Text className='navText-style'>Creme Brulee</Navbar.Text>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand id='order-bar' href="/order-cake">Order Online</Navbar.Brand>
            <Navbar.Brand id='login-bar' onClick={handleShow}>Login<AccountCircleOutlinedIcon style={{ marginLeft: 10, marginBottom: 3 }} /></Navbar.Brand>
            <Navbar.Brand id='cart-bar' href="/">Cart<i class="fi fi-ss-shopping-cart"></i></Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>

{/*login modal*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Button variant='light' size='lg' style={{ borderRadius: 2, fontFamily: "times of new roman" ,width:200}}  onClick={openLogin}>Login</Button>
          <Button onClick={openRegister} variant='light' size='lg' style={{ borderRadius: 2, marginLeft: 100, fontFamily: "times of new roman",width:200}}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={loginSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label className='form-labels'>Username</Form.Label>
                  <Form.Control
                  onChange={inputChange}
                    type="text"
                    name='username'
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    This Username not exist.
                  </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label className='form-labels'>Password</Form.Label>
                <Form.Control onChange={inputChange} name='password' type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                  Password is incorrect.
                </Form.Control.Feedback>
              </Form.Group>
             <FormCheck className='form-checkbox' type='{type}' label='Remember Me'></FormCheck>
            </Row>
            <Col>
            <a className='form-labels' >Lost Your Password</a>
            <Button  type='submit' size='lg' variant='outline-dark' style={{marginLeft:150,borderRadius:2,width:150,fontFamily:"times of new roman"}}>Login</Button></Col>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

{/*register modal*/}
      <Modal show={open}>
        <Modal.Header>
        <Button variant='light' size='lg' style={{ borderRadius: 2, fontFamily: "times of new roman" ,width:200}}  onClick={openLogin}>Login</Button>
        <Button onClick={openRegister} variant='light' size='lg' style={{ borderRadius: 2, marginLeft: 100, fontFamily: "times of new roman",width:200}}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={registerSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label className='form-labels'>Username</Form.Label>
                  <Form.Control
                  onChange={inputChange}
                  className='controls'
                  name='username'
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Username already exist.
                  </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label className='form-labels'>Email</Form.Label>
                  <Form.Control
                  onChange={inputChange}
                   className='controls'
                   name='email'
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Email already exist.
                  </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label className='form-labels'>Password</Form.Label>
                <Form.Control onChange={inputChange}  className='controls' name='password' type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                  Password is weak.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label className='form-labels'>Repeat Password</Form.Label>
                <Form.Control onChange={inputChange} className='controls'name='repeatpassword' type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                  Please Check Password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type='submit' size='lg' variant='outline-dark' style={{borderRadius:2,width:150,marginLeft:15,fontFamily:"times of new roman "}}>Register</Button>
           </Row>
            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={actionClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      


    </>
  )
}

