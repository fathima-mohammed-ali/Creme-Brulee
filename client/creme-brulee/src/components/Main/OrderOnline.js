import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import Modal from 'react-bootstrap/Modal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Row, Form, Col, Breadcrumb } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2'
import './Main.css'
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";


function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
        per_page = per_page_items,
        offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset).slice(0, per_page_items),
        total_pages = Math.ceil(items.length / per_page);
    console.log();

    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: total_pages > page ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };

}

export default function OrderOnline() {
    const selectFilterPrice = useSelector(state => state.filtered.filter);
    const category = useSelector(state => state.selectedCategory.select_Category);
    const [categoryName, setCategoryName] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [carrierDetails, setCarrierDetails] = useState([])
    const [role, setRole] = useState("")

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        console.log("User Role:", userRole); // Debugging: Check the role
        setRole(userRole || ""); // Assuming you have a `setRole` state setter
    }, []);
    console.log("Current Role State:", role);


    useEffect(() => {
        axios.get("http://localhost:4000/order/view-product")
            .then((response) => {
                console.log(response);
                const details = response.data.details;
                setCarrierDetails(details)
            })
    }, [])

    useEffect(() => {
        setFilterActive(selectFilterPrice !== null && selectFilterPrice.length > 0);
        setCategoryName(category !== null && category.length > 0);
    }, [selectFilterPrice, category]);

    console.log(category);


    const count = Math.ceil(carrierDetails.length / 3);
    console.log(count);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(paginator(carrierDetails, value, 3).page);
    };
    const [checked, setChecked] = React.useState([]);
    const handleOnChange = (e, index) => {
        let prev = checked;
        let itemIndex = prev.indexOf(index);
        if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
        } else {
            prev.push(index);
        }
        setChecked([...prev]);
    };



    {/*to view Modal*/ }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const showAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Done!',
            text: 'Your item is added to the cart!',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'swal-custom-button'
            }
        });
    }
    const errorMessage = () => {
        Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'The Admin access permisson is denied !',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'swal-custom-button'
            }
        });
    }

    const handleCart = (id) => {
        const data = {
            productID: id
        }
        const token = localStorage.getItem('token')
        axios.post("http://localhost:4000/cart/add-to-cart", data, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            showAlert();
        })
        .catch((error) => {
            errorMessage();
            console.error(error);
            // Handle error here, show a specific message if needed
        });
    }


    const [validated, setValidated] = useState(false);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === true) {
    //         event.stopPropagation();
    //         axios.post("http://localhost:4000/order-online", placeOrder).then((response) => {
    //             console.log(response);
    //         })
    //     }

    //     setValidated(true);
    // };

    const [flip, setFlip] = useState({
        index: ''
    });

    return (
        <>
            {role === 'admin' && (
                <Breadcrumb style={{ marginTop: 100 }}>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/add-product">
                        Add&Delete
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
                </Breadcrumb>
            )}

            {/*order card parent div1*/}

            <div className='flex-container'>

                {paginator(filterActive ? selectFilterPrice : categoryName ? category : carrierDetails, page, 6).data.map((data, index) => (
                    <>
                        <ReactCardFlip isFlipped={flip.index === index ? true : false}
                            flipDirection="vertical">
                            <div className='card-one'>
                                <Card style={{ width: '15rem', marginTop: 50, }} alignItems="flex-start"
                                    divider={index < carrierDetails.length - 1}>
                                    <Card.Img variant="top" src={`/upload/${data.image}`} />
                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: "Dancing script", fontSize: "5vh" }}><b>{data.itemName}</b></Card.Title>
                                        <Button className='details-btn' variant="dark" onClick={() => setFlip({ index: index })}>For More Details</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div style={{
                                width: '15rem',
                                height: 'auto',
                                backgroundColor: '#F3E9DC',
                                color:'#5E3023',
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
                                <Button className='addToCart-btn' onClick={() => handleCart(data._id)}>Add To Cart</Button>
                                <br />
                                <Button className='goBack-btn' style={{
                                    width: '150px',
                                    marginTop: 10,
                                    fontSize: '20px',
                                    borderRadius: '5px'
                                }} onClick={() => setFlip(!flip)}>
                                    Go Back</Button>
                            </div>
                        </ReactCardFlip>
                    </>

                ))}

            </div>


            <Stack spacing={2}>
                <Pagination
                    sx={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}
                    count={count}
                    page={page}
                    onChange={handleChange}
                />
            </Stack>

        </>

    )
}
