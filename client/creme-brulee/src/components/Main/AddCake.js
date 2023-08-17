import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, InputGroup, Modal,Dropdown,Breadcrumb } from 'react-bootstrap';
import './Main.css'
import axios from 'axios'
import { TextField } from '@mui/material';
export default function AddCake() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [DeleteCake, setDeleteCake] = useState({
        cakename: "",
    })
   
    const [fileURL, setFileURL] = useState(null);
    console.log(fileURL);
    const [cakename, setCakename] = useState('');
    const remove = (event) => {
        const { name, value } = event.target
        setDeleteCake({ ...DeleteCake, [name]: value })
        setUpdateData({...updateData, oldcakename: value})
        setCakename(value)    
    }
    useEffect(() => {
      if(cakename!=''){
        axios.get(`http://localhost:4000/order/cake-image/${cakename}`)
        .then((response) => {
            console.log(response);
            const details = response.data.details.image; 
              setFileURL(details)

        }).catch((err)=>{
            console.log(err);
        })
      }
    }, [cakename])

    const [updateData, setUpdateData] = useState({
        oldcakename:"",
        cakename: "",
        description: "",
        ingredients: "",
        price: "",
        image: "",
    })

    const [file, setfile] = useState('')
    const [addCake, setAddcake] = useState({
        cakename: "",
        description: "",
        ingredients: "",
        price: "",
        image: "",
    })
    const inputChange = (event) => {
        const { name, value } = event.target
        setAddcake({ ...addCake, [name]: value })
    }
    const updateChange = (event) => {
        const { name, value } = event.target
        setUpdateData({ ...updateData, [name]: value })
    }
    const [validated, setValidated] = useState(false);

    const submitNew = () => {   
        const data = new FormData();
        const filename = file.name
        data.append("name", filename)
        data.append("file", file)
        data.append("oldcakename",updateData.oldcakename)
        data.append("cakename", updateData.cakename)
        data.append("description", updateData.description)
        data.append("ingredients", updateData.ingredients)
        data.append("price", updateData.price)
        data.append("image", updateData.image)
        axios.post(`http://localhost:4000/order/update-cake`,data).then((response) => {
            console.log(response);
            if (fileURL) {
                URL.revokeObjectURL(fileURL);
                setFileURL(null);
              }
        })
    
    }
    const deleteSubmit = () => {
        axios.post(`http://localhost:4000/order/delete-cake`, DeleteCake).then((response) => {
            console.log(response);
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
            data.append("cakename", addCake.cakename)
            data.append("description", addCake.description)
            data.append("ingredients", addCake.ingredients)
            data.append("price", addCake.price)
            data.append("image", addCake.image)
            axios.post('http://localhost:4000/order/cake-details', data).then((response) => {
                console.log(response);
            })
        }
        setValidated(true);
    }
    return (
        <>
         <Breadcrumb style={{ marginTop: 150 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/order-cake">
                    Back to Page
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <InputGroup className='cakename'>
                        <InputGroup.Text>Cake Name/Flavour</InputGroup.Text>
                        <Form.Control onChange={inputChange} name='cakename' type="text" required placeholder="eg:Spanish Delight" />
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
                        <Form.Control onChange={(e) => { e.preventDefault(); setAddcake({ ...addCake, image: e.target.files[0].name }); setfile(e.target.files[0]); }} type="file" />
                    </Form.Group>
                </Row>
                <Button type='submit' variant="primary">
                    Add To Page
                </Button>
            </Form >

            <Form>
                  <Row className="mb-3">
                    <InputGroup className='cakename'>
                        <InputGroup.Text>Cake Name/Flavour</InputGroup.Text>
                        <Form.Control onChange={remove} name='cakename' type="text" required placeholder="eg:Spanish Delight" />
                    </InputGroup>
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Choose a Cake
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
                    <Modal.Title>Update Cake</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField onChange={updateChange} sx={{ marginBottom: 2 }} label='Cake Flavour' name='cakename' ></TextField>
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
