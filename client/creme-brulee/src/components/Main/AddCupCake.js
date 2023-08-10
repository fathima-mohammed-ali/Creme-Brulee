import React,{useState,useEffect} from 'react'
import { Form, Row, Col, Button, InputGroup, Modal,Dropdown,Breadcrumb } from 'react-bootstrap';
import './Main.css'
import axios from 'axios'
import { TextField } from '@mui/material';
export default function AddCupCake() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [DeleteCupcake, setDeleteCupcake] = useState({
        cupcakename: ""
    })
    const remove = (event) => {
        const { name, value } = event.target
        setDeleteCupcake({ ...DeleteCupcake, [name]: value })
        setUpdateData({ ...updateData, oldcupcakename: value })
    }
    const [updateData, setUpdateData] = useState({
        oldcupcakename:"",
        cupcakename: "",
        description: "",
        ingredients: "",
        price: "",
        image: "",
    })
console.log(updateData);
    const [file, setfile] = useState('')
    const [AddCupCake, setAddCupCake] = useState({
        cupcakename: "",
        description: "",
        ingredients: "",
        price: "",
        image: "",
    })
    const inputChange = (event) => {
        const { name, value } = event.target
        setAddCupCake({ ...AddCupCake, [name]: value })
    }
    const updateChange = (event) => {
        const { name, value } = event.target
        setUpdateData({ ...updateData, [name]: value })
    }
    const [validated, setValidated] = useState(false);

    const submitNew = () => {
        axios.post(`http://localhost:4000/order/update-cupcake`, updateData).then((response) => {
            console.log(response);
            const details = response.data.details
        })
    }
    const deleteSubmit = () => {
        axios.post(`http://localhost:4000/order/delete-cupcake`, DeleteCupcake).then((response) => {
            console.log(response);
            console.log(DeleteCupcake);
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.stopPropagation();
            const data = new FormData();
            const filename = file.name
            data.append("name", filename)
            data.append("file", file)
            data.append("cupcakename", AddCupCake.cupcakename)
            data.append("description", AddCupCake.description)
            data.append("ingredients", AddCupCake.ingredients)
            data.append("price", AddCupCake.price)
            data.append("image", AddCupCake.image)
            axios.post('http://localhost:4000/order/cupcake-details', data).then((response) => {
                console.log(response);
            })
        }
    }
  return (
   <>
    <Breadcrumb style={{ marginTop: 150 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/order-cupcake">
                    Back to Page
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <InputGroup className='cakename'>
                        <InputGroup.Text>Cupcake Name/Flavour</InputGroup.Text>
                        <Form.Control onChange={inputChange} name='cupcakename' type="text" required placeholder="eg:Choco Fill" />
                    </InputGroup>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label className='order-labels'>Description</Form.Label><br />
                        <textarea onChange={inputChange} name='description' type="text" placeholder="eg:loperm" required className='descrp'></textarea>
                        <Form.Control.Feedback type="invalid">
                            Description Required.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label className='order-labels'>Ingredients</Form.Label><br />
                        <textarea onChange={inputChange} name='ingredients' type="text" placeholder="eg:loperm" required className='descrp'></textarea>
                        <Form.Control.Feedback type="invalid">
                            Ingredients Required.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <InputGroup className='price-define' >
                            <InputGroup.Text>Price</InputGroup.Text>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control onChange={inputChange} name='price' type="number" required placeholder="0.00" aria-label="Dollar amount (with dot and two decimal places)" />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Mention the Price.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control onChange={(e) => { e.preventDefault(); setAddCupCake({ ...AddCupCake, image: e.target.files[0].name }); setfile(e.target.files[0]); }} type="file" />
                    </Form.Group>
                </Row>
                <Button type='submit' variant="primary">
                    Add To Page
                </Button>
            </Form >

            <Form>
                <Row className="mb-3">
                    <InputGroup className='cakename'>
                        <InputGroup.Text>Cupcake Name/Flavour</InputGroup.Text>
                        <Form.Control onChange={remove} name='cupcakename' type="text" required placeholder="eg:Choco Fill" />
                    </InputGroup>
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Choose a 
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Choco Nut</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Spanish Delight</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Chocalate Truffle</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Red Velvet</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Toffee</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </Row>
                <Button variant="primary" onClick={deleteSubmit}>
                    Delete
                </Button>&nbsp;&nbsp;
                <Button variant="primary" onClick={handleShow}>
                    Update
                </Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Cupcake</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField onChange={updateChange} sx={{ marginBottom: 2 }} label='Cupcake' name='cupcakename' ></TextField>
                    <TextField onChange={updateChange} sx={{ marginBottom: 2, marginLeft: 2 }} label='Description' name='description'></TextField>
                    <TextField onChange={updateChange} sx={{ marginBottom: 2 }} label='Ingredeints' name='ingredients'></TextField>
                    <TextField onChange={updateChange} sx={{ marginBottom: 2, marginLeft: 2 }} label='Price' name='price'></TextField>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control onChange={(e) => { e.preventDefault(); setUpdateData({ ...updateData, image: e.target.files[0].name }); setfile(e.target.files[0]); }} type="file" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitNew}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
   
   </>
  )
}
