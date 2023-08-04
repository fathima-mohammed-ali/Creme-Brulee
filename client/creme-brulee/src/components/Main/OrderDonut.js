import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import Modal from 'react-bootstrap/Modal';
import { Row, Form, Col, Breadcrumb } from 'react-bootstrap'
import './Main.css'
import axios from 'axios';
export default function OrderDonut() {
    const [flip, setFlip] = useState({
        index: ''
    });
     {/*to view Modal*/ }
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
     const [donutOrder, setDonutOrder] = useState({
        event: "",
        theme: "",
        pieces: "",
        flavour: "",
        date: "",
        time: "",
        location: "",
        contact: "",
    })
    const inputChange = (event) => {
        const { name, value } = event.target
        setDonutOrder({ ...donutOrder, [name]: value })
    }
    const [validated, setValidated] = useState(false);
    const [getAddDonut, setGetAddDonut] = useState([])
    useEffect(() => {
        axios.get("http://localhost:4000/order/view-donut")
            .then((response) => {
                console.log(response);
                const details = response.data.details;
                setGetAddDonut(details)

            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.stopPropagation();
            axios.post("http://localhost:4000/order/donut", donutOrder).then((response) => {
                console.log(response);
            })
        }

        setValidated(true);
    }
    return (
        <>
         <Breadcrumb style={{ marginTop: 150 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/add-donut">
                    Add&Delete
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>

            {/*order card parent div1*/}
            <div className='flex-container'>
                {getAddDonut.map((data,key) => (
                    <>
                <ReactCardFlip isFlipped={flip.index === key ? true : false}
                    flipDirection="vertical">
                    <div className='card-one'>
                        <Card style={{ width: '15rem', marginTop: 50, }}>
                            <Card.Img variant="top" src={`/upload/${data.image}`} />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>{data.donutname}</b></Card.Title>
                                <Button variant="dark" onClick={() => setFlip({ index: key })}>For More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '15rem',
                        height: 'auto',
                        backgroundColor: 'aliceblue',
                        marginTop: 50,
                        marginLeft: 20,
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}>
                        <h4 id='description'>Description</h4>
                        <p>{data.description} </p>
                        <h4 id='ingredients'>Ingredients</h4>
                        <p>{data.ingredients}</p>
                        <h4> ${data.price}</h4>
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
                </>
                ))}
            </div>

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
                                <Form.Label className='order-labels'>How Many Pieces</Form.Label>
                                <Form.Control onChange={inputChange} name='pieces' type="number" placeholder="eg:no:donuts" required />
                                <Form.Control.Feedback type="invalid">
                                    Mention the no:donuts.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label className='order-labels'>Flavour</Form.Label>
                                <Form.Control onChange={inputChange} name='flavour' type="text" defaultValue="Spanish Delight" required />
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
        </>
    )
}
