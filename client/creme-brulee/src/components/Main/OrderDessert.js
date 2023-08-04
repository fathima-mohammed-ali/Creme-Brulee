import React from 'react'

export default function OrderDessert() {
    const [getAddDessert, setGetAddDessert] = useState([])
    {/*to view Modal*/ }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    {/*to store cake items*/ }
    const [dessertOrder, setDessertOrder] = useState({
        event: "",
        theme: "",
        item: "",
        flavour: "",
        date: "",
        time: "",
        location: "",
        contact: "",
    })
    const inputChange = (event) => {
        const { name, value } = event.target
        setDessertOrder({ ...dessertOrder, [name]: value })
    }
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.stopPropagation();
            axios.post("http://localhost:4000/order/dessert", dessertOrder).then((response) => {
                console.log(response);
            })
        }

        setValidated(true);
    };
    useEffect(() => {
        axios.get("http://localhost:4000/order/view-dessert")
            .then((response) => {
                console.log(response);
                const details = response.data.details;
                setGetAddDessert(details)

            })
    }, [])
    const [flip, setFlip] = useState({
        index:''
    });
    return (
        <>
            <Breadcrumb style={{ marginTop: 150 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/add-dessert">
                    Add&Delete
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>

            {/*order card parent div1*/}
            <div className='flex-container'>
                {getAddCake.map((data, key) => (
                    <>
                        <ReactCardFlip isFlipped={flip.index === key ? true : false}
                            flipDirection="vertical">
                            <div className='card-one'>
                                <Card style={{ width: '15rem', marginTop: 50, }}>
                                    <Card.Img variant="top" src={`/upload/${data.image}`} />
                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>{data.dessertname}</b></Card.Title>
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
                                <h4>${data.price}</h4>
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

            {/*order card parent div2*/}

            <div className='flex-container'>


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
                                    <Form.Label className='order-labels'>Item</Form.Label>
                                    <Form.Control onChange={inputChange} name='item' type="text" placeholder="eg:cake" required />
                                    <Form.Control.Feedback type="invalid">
                                        Mention your item.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label className='order-labels'>Flavour</Form.Label>
                                    <Form.Control onChange={inputChange} name='flavour' type="text" value={getAddDessert.dessertname} required />
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
