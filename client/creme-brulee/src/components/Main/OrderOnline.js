import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import Modal from 'react-bootstrap/Modal';
import { Row, Form, Col } from 'react-bootstrap'
import axios from 'axios';
import './Main.css'
export default function OrderOnline() {
    {/*to view Modal*/ }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    {/*to store cake items*/ }
    const [cakeOrder, setCakeOrder] = useState({
        event: "",
        theme: "",
        kg: "",
        flavour: "",
        date: "",
        time: "",
        location: "",
        contact: "",
    })
    const inputChange = (event) => {
        const { name, value } = event.target
        setCakeOrder({ ...cakeOrder, [name]: value })
    }
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.stopPropagation();
            axios.post("http://localhost:4000/order/cake", cakeOrder).then((response) => {
                console.log(response);
            })
        }

        setValidated(true);
    };
    const [flip, setFlip] = useState(false);
    const [fliptwo, setFliptwo] = useState(false);
    const [flipthree, setFlipthree] = useState(false);
    const [flipfour, setFlipfour] = useState(false);
    const [flipfive, setFlipfive] = useState(false);
    const [flipsix, setFlipsix] = useState(false);
    return (
        <>

            {/*order card parent div1*/}
            <div className='flex-container'>
                <ReactCardFlip isFlipped={flip}
                    flipDirection="vertical">
                    <div className='card-one'>
                        <Card style={{ width: '18rem', marginTop: 150, marginLeft: 50 }}>
                            <Card.Img variant="top" src="https://images.pexels.com/photos/2510104/pexels-photo-2510104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>Spanish Delight</b></Card.Title>
                                <Button variant="primary" onClick={() => setFlip(!flip)}>For More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        height: '550px',
                        backgroundColor: 'aliceblue',
                        marginTop: 150,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}>
                        <h4 id='description'>Description</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <h4 id='ingredients'>Ingredients</h4>
                        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>$49</h4>
                        <Button onClick={handleShow}>Order Now</Button>
                        <br />
                        <Button style={{
                            width: '150px',
                            marginTop: 10,
                            fontSize: '20px',
                            background: 'azure',
                            color: 'blueviolet',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlip(!flip)}>
                            Flip</Button>
                    </div>
                </ReactCardFlip>

                <ReactCardFlip isFlipped={fliptwo}
                    flipDirection="vertical">
                    <div className='card-two'>
                        <Card style={{ width: '18rem', marginTop: 150, marginLeft: 20 }}>
                            <Card.Img variant="top" src="https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>Choco Nut</b></Card.Title>
                                <Button variant="primary" onClick={() => setFliptwo(!fliptwo)}>For More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        height: '550px',
                        backgroundColor: 'aliceblue',
                        marginTop: 150,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                        // padding: '20px'
                    }}>
                        <h4 id='description'>Description</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <h4 id='ingredients'>Ingredients</h4>
                        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>$29</h4>
                        <Button onClick={handleShow}>Order Now</Button>
                        <br />
                        <Button style={{
                            width: '150px',
                            marginTop: 10,
                            fontSize: '20px',
                            background: 'azure',
                            color: 'blueviolet',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFliptwo(!fliptwo)}>
                            Flip</Button>
                    </div>
                </ReactCardFlip>


                <ReactCardFlip isFlipped={flipthree}
                    flipDirection="vertical">
                    <div className='card-three'>
                        <Card style={{ width: '18rem', marginTop: 150, marginLeft: 20 }}>
                            <Card.Img variant="top" src="https://images.pexels.com/photos/691147/pexels-photo-691147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>Chocalate Truffle</b></Card.Title>
                                <Button variant="primary" onClick={() => setFlipthree(!flipthree)}>For More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        height: '550px',
                        background: 'aliceblue',
                        marginTop: 150,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}>
                        <h4 id='description'>Description</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <h4 id='ingredients'>Ingredients</h4>
                        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>$29</h4>
                        <Button onClick={handleShow}>Order Now</Button>
                        <br />
                        <Button style={{
                            width: '150px',
                            marginTop: 10,
                            background: 'azure',
                            color: 'blueviolet',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlipthree(!flipthree)}>
                            Flip</Button>
                    </div>


                </ReactCardFlip>
            </div>

            {/*order card parent div2*/}

            <div className='flex-container'>
                <ReactCardFlip isFlipped={flipfour}
                    flipDirection="vertical">
                    <div className='card-four'>
                        <Card style={{ width: '18rem', marginTop: 50, marginLeft: 50 }}>
                            <Card.Img variant="top" src="https://images.pexels.com/photos/1998633/pexels-photo-1998633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>Toffee</b></Card.Title>
                                <Button variant="primary" onClick={() => setFlipfour(!flipfour)}>For More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        height: '550px',
                        background: 'aliceblue',
                        marginTop: 50,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}>
                        <h4 id='description'>Description</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <h4 id='ingredients'>Ingredients</h4>
                        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>$20</h4>
                        <Button onClick={handleShow}>Order Now</Button>
                        <br />
                        <Button style={{
                            width: '150px',
                            marginTop: 10,
                            background: 'azure',
                            color: 'blueviolet',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlipfour(!flipfour)}>
                            Flip</Button>
                    </div>


                </ReactCardFlip>

                <ReactCardFlip isFlipped={flipfive}
                    flipDirection="vertical">
                    <div className='card-five'>
                        <Card style={{ width: '18rem', marginTop: 50, marginLeft: 20 }}>
                            <Card.Img variant="top" src="https://images.pexels.com/photos/2323206/pexels-photo-2323206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>Red Velvet</b></Card.Title>
                                <Button variant="primary" onClick={() => setFlipfive(!flipfive)}>For More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        height: '550px',
                        background: 'aliceblue',
                        marginTop: 50,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}>
                        <h4 id='description'>Description</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <h4 id='ingredients'>Ingredients</h4>
                        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>$25</h4>
                        <Button onClick={handleShow}>Order Now</Button>
                        <br />
                        <Button style={{
                            width: '150px',
                            marginTop: 10,
                            background: 'azure',
                            color: 'blueviolet',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlipfive(!flipfive)}>
                            Flip</Button>
                    </div>


                </ReactCardFlip>
                <ReactCardFlip isFlipped={flipsix}
                    flipDirection="vertical">
                    <div className='card-five'>
                        <Card style={{ width: '18rem', marginTop: 50, marginLeft: 20 }}>
                            <Card.Img variant="top" src="https://images.pexels.com/photos/3302492/pexels-photo-3302492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>Pineapple Cake</b></Card.Title>
                                <Button variant="primary" onClick={() => setFlipsix(!flipsix)}>For More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        height: '550px',
                        background: 'aliceblue',
                        marginTop: 50,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}>
                        <h4 id='description'>Description</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <h4 id='ingredients'>Ingredients</h4>
                        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>$35</h4>
                        <Button onClick={handleShow}>Order Now</Button>
                        <br />
                        <Button style={{
                            width: '150px',
                            marginTop: 10,
                            background: 'azure',
                            color: 'blueviolet',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlipsix(!flipsix)}>
                            Flip</Button>
                    </div>


                </ReactCardFlip>

                {/*modal for place order*/}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontFamily: "Dancing script" }}>Your Order Please!..</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                    <Form.Label className='order-labels'>Event</Form.Label>
                                    <Form.Control
                                        onChange={inputChange}
                                        type="text"
                                        name='event'
                                        placeholder="eg:Wedding"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Mention the Event.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Theme</Form.Label>
                                    <Form.Control onChange={inputChange} name='theme' type="text" placeholder="eg:floral" required />
                                    <Form.Control.Feedback type="invalid">
                                        Mention the Theme.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Kg</Form.Label>
                                    <Form.Control onChange={inputChange} name='kg' type="number" placeholder="eg:no:tiers" required />
                                    <Form.Control.Feedback type="invalid">
                                        Mention the Kg.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Flavour</Form.Label>
                                    <Form.Control onChange={inputChange} name='flavour' type="text" placeholder="eg:Ferraro Rocher" required />
                                    <Form.Control.Feedback type="invalid">
                                        Sorry this Flavour not available.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Date</Form.Label>
                                    <Form.Control onChange={inputChange} name='date' type="date" required />
                                    <Form.Control.Feedback type="invalid">
                                        Mention the date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Time</Form.Label>
                                    <Form.Control onChange={inputChange} name='time' type="time" required />
                                    <Form.Control.Feedback type="invalid">
                                        Time not added.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Location</Form.Label>
                                    <Form.Control onChange={inputChange} name='location' type="text" placeholder="eg:Where to deliver" required />
                                    <Form.Control.Feedback type="invalid">
                                        Location not specified
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Mobile/Phone Number</Form.Label>
                                    <Form.Control onChange={inputChange} name='contact' type="tel" placeholder="eg:Your Contact Number" required />
                                    <Form.Control.Feedback type="invalid">
                                        Contact Number is invalid
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button type='submit' variant="primary">
                            Place Order
                        </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>



        </>

    )
}
