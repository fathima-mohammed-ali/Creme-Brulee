import React from 'react'
import { useState } from 'react';
import { Button, Navbar, Nav, Container, Row, Col, NavbarBrand, Modal, Form, InputGroup, FormCheck, ModalBody } from 'react-bootstrap';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from 'axios'
import Swal from 'sweetalert2'

import './Nav.css'
export default function MainNav() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    role: "",
  })
  const [userInfo, setUserInfo] = useState({
    email: '',


  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const inputChange = (event) => {
    const { name, value } = event.target
    setUserInfo({ ...userInfo, [name]: value })
    setLoginInfo({ ...loginInfo, [name]: value })
  }
   const registerAlert = () => {
          Swal.fire({
              icon: 'success',
              text: 'You have registered succesfully!',
          });
      }
      const loginAlert = () => {
        Swal.fire({
            icon: 'success',
            text: 'Login successfully',
        });
    }
  const loginError = () => {
    Swal.fire({
        icon: 'error',
        text: 'Login failed please recheck your information',
    });
}
    

  const registerSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();

      axios.post("http://localhost:4000/register/user", userInfo).then((response) => {
        console.log(response);
        registerAlert();
      }) .catch((error) => {
        // Handle different error status codes
        if (error.response) {
          const statusCode = error.response.status;
          
          if (statusCode === 409) {
            registerError("Username or Email already exists.");
          } else if (statusCode === 400) {
            registerError("Something went wrong, please try again.");
          } else {
            registerError("Unexpected error occurred.");
          }
        } else {
          // Handle network or other errors
          registerError("Network error, please check your connection.");
        }
      });
    
    // Error handling function
    const registerError = (message) => {
      Swal.fire({
        icon: 'error',
        text: message,
      });
    };
    }

    setValidated(true);
  }

  const loginSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      console.log(loginInfo);
      axios.post("http://localhost:4000/login/user-login", loginInfo).then((response) => {
        console.log(response);
        if (response.data.token) {
          // Store token and role in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role); // Store role here

          if (response.data.role === 'user') {
            console.log("Logged in as User");
          } else if (response.data.role === 'admin') {
            console.log("Logged in as Admin");
          }
        }
        loginAlert();
      }).catch(()=>{
        loginError();
      })
    }
    setValidated(true);
  };

  const openRegister = () => {
    setShow(false)
    setOpen(true)
  }
  const openLogin = () => {
    setShow(true)
    setOpen(false)
  }
  const actionClose = () => setOpen(false)

  return (
    <>
      <Navbar expand="lg" fixed="top" className="nav-style" data-bs-theme="dark">
        <Container className="flex-navContainer">
          {/* Centered Static Heading */}
          <div className="navText-style">Creme Brulee</div>

          {/* Toggle Button */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Collapsible Nav Links */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand id="Nav-links" href="/">Home</Navbar.Brand>
            <Navbar.Brand id="Nav-links" href="/blog">Blog</Navbar.Brand>
            <Navbar.Brand id="Nav-links" href="/order-online">Order Online</Navbar.Brand>
            <Navbar.Brand id="Nav-links" onClick={handleShow}>
              Login
              <AccountCircleOutlinedIcon style={{ marginLeft: 10, marginBottom: 3 }} />
            </Navbar.Brand>
            <Navbar.Brand id="Nav-links" href="/cart">
              Cart
              <i className="fi fi-ss-shopping-cart"></i>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      {/*login modal*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Button variant='light' size='lg' style={{ borderRadius: 2, fontFamily: "times of new roman", width: 200 }} onClick={openLogin}>Login</Button>
          <Button onClick={openRegister} variant='light' size='lg' style={{ borderRadius: 2, marginLeft: 100, fontFamily: "times of new roman", width: 200 }}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={loginSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label className='form-labels'>Username</Form.Label>
                <Form.Control
                  onChange={inputChange}
                  type="text"
                  name='username'
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="^[A-Za-z]+$"
                />
                <Form.Control.Feedback type="invalid">
                  This Username is invalid.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label className='form-labels'>Password</Form.Label>
                <Form.Control onChange={inputChange} name='password' type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                  Password is invalide.
                </Form.Control.Feedback>
              </Form.Group>
              {/* <FormCheck className='form-checkbox' type='{type}' label='Remember Me'></FormCheck> */}
            </Row>
            <Col>
              <a className='form-labels' >Lost Your Password</a>
              <Button type='submit' size='lg' variant='outline-dark' style={{ marginLeft: 150, borderRadius: 2, width: 150, fontFamily: "times of new roman" }}>Login</Button></Col>

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
          <Button variant='light' size='lg' style={{ borderRadius: 2, fontFamily: "times of new roman", width: 200 }} onClick={openLogin}>Login</Button>
          <Button onClick={openRegister} variant='light' size='lg' style={{ borderRadius: 2, marginLeft: 100, fontFamily: "times of new roman", width: 200 }}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={registerSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md="4" controlId="validationCustomUsername">
                <Form.Label className='form-labels'>Username</Form.Label>
                <Form.Control
                  onChange={inputChange}
                  className='controls'
                  name='username'
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  pattern="^[A-Za-z]+$"
                />
                <Form.Control.Feedback type="invalid">
                  Username invalid please Recheck Username.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md="4" controlId="validationCustomUsername">
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
                  Email is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12}  md="6" controlId="validationCustom03">
                <Form.Label className='form-labels'>Password</Form.Label>
                <Form.Control onChange={inputChange} className='controls' name='password' type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                  Password is weak.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} xs={12} md="6" controlId="validationCustom03">
                  <Form.Label className='form-labels'>Repeat Password</Form.Label>
                  <Form.Control onChange={inputChange} className='controls' name='repeatpassword' type="password" placeholder="Password" required />
                  <Form.Control.Feedback type="invalid">
                    Please Check Password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type='submit' size='lg' variant='outline-dark' style={{ borderRadius: 2, width: 150, marginLeft: 15, fontFamily: "times of new roman " }}>Register</Button>
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

