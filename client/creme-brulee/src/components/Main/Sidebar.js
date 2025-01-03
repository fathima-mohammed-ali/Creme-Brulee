import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Slider, Button } from '@mui/material';
import './Main.css'
import { Facebook, Twitter, Pinterest, YouTube } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategoryName, toggleCategory } from '../features/CategoryName';
import { setSelectedCategory } from '../features/Categories';
import { setFiltered } from '../features/Filter';



// const categories=['cake','cupcake','donut','dessert']
// function check_category(category){
//     return category==='cake'|| category==='donut'||category==='dessert'||category==='cupcake';
// }
// const price_filter =categories.filter(check_category)
// console.log(price_filter);

export default function Sidebar() {
    const dispatch = useDispatch();
    const categoryName = useSelector((state) => state.categoryName.names)
    const category = useSelector(state => state.selectedCategory.select_Category);
    const [filterValues, setFilterValues] = useState([])
    const [minPrice, setMinPrice] = useState(20); // Initial min price
    const [maxPrice, setMaxPrice] = useState(80); // Initial max price;

    const navigate = useNavigate()
    console.log(categoryName);
    const changeFilter = (category, itemName) => {
        //  dispatch(toggleCategory(category));
        //  navigate(`/order-${category}`)
        console.log(category);
        axios.get(`http://localhost:4000/order/category-filter`, { params: { category: category, itemName: itemName } }).then((response) => {
            console.log(response);
            const filtered_category = response.data.details
            dispatch(setSelectedCategory(filtered_category))
        })
    }
    console.log(categoryName.cake);
    console.log(categoryName.donut);

    const handleMinPriceChange = (event, newMinPrice) => {
        setMinPrice(newMinPrice);
    };

    const handleMaxPriceChange = (event, newMaxPrice) => {
        setMaxPrice(newMaxPrice);
    };

    const handleFilter = () => {
        // dispatch(toggleCategory(category));
        // dispatch(setSelectedCategory(category))
        //  const filteredData= category.filter((data)=>{
        //     return data.price>=minPrice && data.price<=maxPrice
        //  })
        const filter = { minPrice, maxPrice }
        console.log(filter);
        axios.get(`http://localhost:4000/order/price-filter`, { params: filter }).then((response) => {
            console.log(response);
            const filterData = response.data.details;
            // setFilterValues(filterData)
            dispatch(setFiltered(filterData));

        })

    }

    return (
        <>
            <div className='sidebar'>
                <ul>
                    <h2 id='categories'>Categories</h2>
                    <li style={{ marginLeft: 20 }}><Button size='small' sx={{ color: 'gray', fontFamily: 'Poppins', textTransform: 'none', fontSize: '3vh' }} onClick={() => { changeFilter('cake'); dispatch(setFiltered([])) }}>Cake</Button></li>
                    <li style={{ marginLeft: 20 }}><Button size='small' sx={{ color: 'gray', fontFamily: 'Poppins', textTransform: 'none', fontSize: '3vh' }} onClick={() => { changeFilter('donut'); dispatch(setFiltered([])) }}>Donut</Button></li>
                    <li style={{ marginLeft: 20 }} ><Button size='small' sx={{ color: 'gray', fontFamily: 'Poppins', textTransform: 'none', fontSize: '3vh' }} onClick={() => { changeFilter('dessert'); dispatch(setFiltered([])) }}>Dessert</Button></li>
                    <li style={{ marginLeft: 20 }}><Button size='small' sx={{ color: 'gray', fontFamily: 'Poppins', textTransform: 'none', fontSize: '3vh' }} onClick={() => { changeFilter('cupcake'); dispatch(setFiltered([])) }}>Cupcake</Button></li>
                </ul>
                <ul>
                    <h2 id='popular-products'>Popular Products</h2>
                    <li style={{ marginLeft: 20 }}>
                            <Button
                                size="small"
                                sx={{
                                    color: 'gray',
                                    fontFamily: 'Poppins',
                                    textTransform: 'none',
                                    fontSize: '3vh',
                                }} onClick={() => { changeFilter('cake','Spanish Delight'); dispatch(setFiltered([])) }}
                        
                            >
                                Spanish Delight
                            </Button>
                    </li>
                    <li style={{ marginLeft: 20 }}>
                            <Button
                                size="small"
                                sx={{
                                    color: 'gray',
                                    fontFamily: 'Poppins',
                                    textTransform: 'none',
                                    fontSize: '3vh',
                                }} onClick={() => { changeFilter('dessert','Carre Chocalate'); dispatch(setFiltered([])) }}
                                
                            >
                                Carre Chocalate
                            </Button>
                    </li>
                    <li style={{ marginLeft: 20 }}>
                            <Button
                                size="small"
                                sx={{
                                    color: 'gray',
                                    fontFamily: 'Poppins',
                                    textTransform: 'none',
                                    fontSize: '3vh',
                                }} onClick={() => { changeFilter('dessert','Pista Sweet'); dispatch(setFiltered([])) }}
                            >
                               Pista Sweet
                            </Button>
                    </li>
                   
                    <li style={{ marginLeft: 20 }}>
                            <Button
                                size="small"
                                sx={{
                                    color: 'gray',
                                    fontFamily: 'Poppins',
                                    textTransform: 'none',
                                    fontSize: '3vh',
                                }} onClick={() => { changeFilter('donut','Strawberry Frost'); dispatch(setFiltered([])) }}
                                // Button for 'Spanish Delight'
                            >
                                Strawberry Frost
                            </Button>
                    </li>
                     
                </ul>
                <h2 id='price-filter' className='ms-5'>Price Filter</h2>
                <Box sx={{ width: 300 }}>
                    <Slider
                        sx={{ width: '200px', marginLeft: 5, color: 'black' }}
                        getAriaLabel={() => 'Price range'}
                        value={[minPrice, maxPrice]}
                        size='small'
                        onChange={(event, newValue) => {
                            handleMinPriceChange(event, newValue[0]);
                            handleMaxPriceChange(event, newValue[1]);
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                    />
                </Box>
                <label id='price'>Price: min ${minPrice}- max ${maxPrice}</label><br />
                <Button id='filter-btn' onClick={handleFilter} sx={{ backgroundColor: 'black', color: 'white', marginLeft: 10, marginTop: 2, width: '100px' }}>Filter</Button>
                <h2 id='sidebar-follow' className='ms-5'>Follow Us</h2>
                <p id='follow-icons' ><Facebook style={{ color: "black", marginRight: 20, marginBottom: 2 }} /><Twitter style={{ color: "black", marginRight: 20, marginBottom: 2 }} /><Pinterest style={{ color: "black", marginRight: 20, marginBottom: 2 }} /><YouTube style={{ color: "black", marginRight: 20, marginBottom: 2 }} /></p>
                <h2 id='tags'>Tags</h2>
                <p id="tag-links" className='ms-5'><Link id='tag-items'>Cakes</Link>/<Link id='tag-items'>Choco</Link>/<Link id='tag-items'>CremeBrulee</Link>/<br /><Link id='tag-items'>Tasty</Link>/<Link id='tag-items'>Yummy</Link>/<Link id='tag-items'>Vanila</Link>/<br /><Link id='tag-items'>Cocoa</Link>/<Link id='tag-items'>Darkchocalate</Link>/<Link id='tag-items'>Whitechocalate</Link>/<br /><Link id='tag-items'>Cremme</Link>/<Link id='tag-items'>CB</Link></p>
            </div >

        </>
    )
}
