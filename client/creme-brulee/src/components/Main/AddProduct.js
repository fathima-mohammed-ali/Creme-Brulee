import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, InputGroup, Modal, Dropdown, Breadcrumb } from 'react-bootstrap';
import './Main.css'
import axios from 'axios'
import { TextField } from '@mui/material';
export default function AddProduct() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [DeleteProduct, setDeleteProduct] = useState({
        itemName: "",
    })

    const [fileURL, setFileURL] = useState(null);
    console.log(fileURL);
    const [productname, setProductname] = useState('');
    const remove = (event) => {
        const { name, value } = event.target
        setDeleteProduct({ ...DeleteProduct, [name]: value })
        setUpdateData({ ...updateData, olditemName: value })
        setProductname(value)
    }
    useEffect(() => {
        if (productname != '') {
            axios.get(`http://localhost:4000/order/product-image/${productname}`)
                .then((response) => {
                    console.log(response);
                    const details = response.data.details.image;
                    setFileURL(details)

                }).catch((err) => {
                    console.log(err);
                })
        }
    }, [productname])

    const [updateData, setUpdateData] = useState({
        category:"",
        olditemName: "",
        itemName: "",
        description: "",
        ingredients: "",
        price: "",
        image: "",
    })

    const [file, setfile] = useState('')
    const [addProduct, setAddProduct] = useState({
        category: "",
        itemName: "",
        description: "",
        ingredients: "",
        price: "",
        image: "",
    })
    const inputChange = (event) => {
        const { name, value } = event.target
        setAddProduct({ ...addProduct, [name]: value })
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
        data.append("category", updateData.category)
        data.append("olditemName", updateData.olditemName)
        data.append("itemName", updateData.itemName)
        data.append("description", updateData.description)
        data.append("ingredients", updateData.ingredients)
        data.append("price", updateData.price)
        data.append("image", updateData.image)
        axios.post(`http://localhost:4000/order/update-product`, data).then((response) => {
            console.log(response);
            if (fileURL) {
                URL.revokeObjectURL(fileURL);
                setFileURL(null);
            }
        })

    }
    const deleteSubmit = () => {
        axios.post(`http://localhost:4000/order/delete-product`, DeleteProduct).then((response) => {
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
            data.append("category", addProduct.category)
            data.append("itemName", addProduct.itemName)
            data.append("description", addProduct.description)
            data.append("ingredients", addProduct.ingredients)
            data.append("price", addProduct.price)
            data.append("image", addProduct.image)
            axios.post('http://localhost:4000/order/product-details', data).then((response) => {
                console.log(response);
            })
        }
        setValidated(true);
    }
    return (
        <>
            <Breadcrumb style={{ marginTop: 150 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/order-online">
                    Back to Page
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Select className='cakename' onChange={inputChange} name='category' aria-label="Default select example">
                        <option >Choose Category</option>
                        <option   value="cake">Cake</option>
                        <option   value="donut">Donut</option>
                        <option  value="dessert">Dessert</option>
                        <option  value="cupcake">Cupcake</option>
                    </Form.Select>
                </Row>
                <Row className="mb-3">
                    <InputGroup className='cakename'>
                        <InputGroup.Text> Name/Flavour</InputGroup.Text>
                        <Form.Control onChange={inputChange} name='itemName' type="text" required placeholder="eg:Spanish Delight" />
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
                        <Form.Control onChange={(e) => { e.preventDefault(); setAddProduct({ ...addProduct, image: e.target.files[0].name }); setfile(e.target.files[0]); }} type="file" />
                    </Form.Group>
                </Row>
                <Button type='submit' variant="primary">
                    Add To Page
                </Button>
            </Form >

            <Form>
                {/* <Row className="mb-3">
                    <InputGroup className='cakename'>
                        <InputGroup.Text>Name/Flavour</InputGroup.Text>
                        <Form.Control onChange={remove} name='cakename' type="text" required placeholder="eg:Spanish Delight" />
                    </InputGroup> */}
                     <Row className="mb-3">
                    <Form.Select onChange={remove} name='itemName' className='cakename' aria-label="Default select example">
                        <option>Choose Product Name</option>
                        <option value="Spanish Delight">Spanish Delight</option>
                        <option value="Success Praline">Success Praline</option>
                        <option value="Sugar Coat Pancake">Sugar Coat Pancake</option>
                        <option value="Glazed Donut">Glazed Donut</option>
                        <option value="Red Velvet">Red Velvet</option>
                        <option value="Macron Special">Macron Special</option>
                        <option value="Mount Minty">Mount Minty</option>
                        <option value="Carre Chocalate">Carre Chocalate</option>
                        <option value="Chocalate Triffle">Chocalate Triffle</option>
                        <option value="Chocalate Truffle">Chocalate Truffle</option>
                        <option value="Chocalate Fill">Chocalate Fill</option>
                        <option value="Choco Nut">Choco Nut</option>
                        <option value="Choco Rich">Choco Rich</option>
                        <option value="BostonCreme">BostonCreme</option>
                        <option value="Brownie">Brownie</option>
                        <option value="BlueBerry">BlueBerry</option>
                        <option value="BlackForest">BlackForest</option>
                        <option value="Vanilla Princess">Vanilla Princess</option>
                        <option value="Vanilla Cupcake">Vanilla Cupcake</option>
                        <option value="Pista Sweet">Pista Sweet</option>
                        <option value="Strawberry Frost">Strawberry Frost</option>
                        <option value="Sprinkles Dunkin">Sprinkles Dunkin</option>
                        <option value="Sprinkles Chocalate">Sprinkles Chocalate</option>
                        <option value="Berry Cake">Berry Cake</option>
                        <option value="Toffee">Toffee</option>
                        <option value="test">test</option>
                    </Form.Select>
                   
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
                    <TextField onChange={updateChange} sx={{ marginBottom: 2 }} label='Category' name='category' ></TextField>
                    <TextField onChange={updateChange} sx={{ marginBottom: 2 }} label='Flavour' name='itemName' ></TextField>
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
