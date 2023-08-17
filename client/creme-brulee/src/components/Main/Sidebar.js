import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Slider, Button } from '@mui/material';
import './Main.css'
import { Facebook, Twitter, Pinterest, YouTube } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


function valuetext(value) {
    
}

export default function Sidebar() {
    const [filterValues,setFilterValues] = useState([])
    const [minPrice, setMinPrice] = useState(20); // Initial min price
    const [maxPrice, setMaxPrice] = useState(80); // Initial max price
  

    const handleMinPriceChange = (event, newMinPrice) => {
        setMinPrice(newMinPrice);
      };
    
      const handleMaxPriceChange = (event, newMaxPrice) => {
        setMaxPrice(newMaxPrice);
      };

    // const dispatch = useDispatch();
    // const { minPrice, maxPrice } = useSelector((state) => state.priceFilter);
    // const [value, setValue] = useState([20, 37])
    // const handleChange = (event, newValue) => {
        // setValue(newValue);
    // };

 
// useEffect(() => {
    axios.get("http://localhost:4000/cake-price-filter").then((response)=>{
        console.log(response);
        const filterData=response.data.details;
        setFilterValues(filterData)
    
    })
// }, [])
    return (
        <>
            <div className='sidebar'>
                <ul>
                    <h2 id='categories'>Categories</h2>
                    <li id='items'><Link id='linkItems' to={'/order-cake'}>Cake</Link></li>
                    <li id='items'><Link id='linkItems' to={'/order-donut'}>Donuts</Link></li>
                    <li id='items'><Link id='linkItems' to={'/order-dessert'}>Desert</Link></li>
                    <li id='items'><Link id='linkItems' to={'/order-cupcake'}>Cup Cakes</Link></li>
                </ul>
                <ul>
                    <h2 id='popular-products'>Popular Products</h2>
                    <li id='items'><Link id='linkItems' to={'/'}>Donuts</Link></li>
                    <li id='items'><Link id='linkItems' to={'/'}>Cake Pops</Link></li>
                    <li id='items'><Link id='linkItems' to={'/'}>Cake Sickles</Link></li>
                    <li id='items'><Link id='linkItems' to={'/'}>Cup Cakes</Link></li>
                </ul>
                <h2 id='price-filter'>Price Filter</h2>
                <Box sx={{ width: 300 }}>
                    <Slider
                        sx={{ width: '200px', marginLeft: 12, color: 'black' }}
                        getAriaLabel={() => 'Price range'}
                        value={[minPrice,maxPrice]}
                        size='small'
                        onChange={(event, newValue) => {
                            handleMinPriceChange(event, newValue[0]);
                            handleMaxPriceChange(event, newValue[1]);
                          }}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={0}
                        max={100}
                    />
                    <label id='price'>Price: min ${0}- max ${100}</label><br />
                    <Button id='filter-btn' sx={{ backgroundColor: 'black', color: 'white', marginLeft: 12, marginTop: 2, width: '100px' }}>Filter</Button>
                </Box>
                <h2 id='sidebar-follow'>Follow Us</h2>
                <p id='follow-icons'><Facebook style={{ color: "black", marginRight: 20, marginBottom: 2 }} /><Twitter style={{ color: "black", marginRight: 20, marginBottom: 2 }} /><Pinterest style={{ color: "black", marginRight: 20, marginBottom: 2 }} /><YouTube style={{ color: "black", marginRight: 20, marginBottom: 2 }} /></p>
                <h2 id='tags'>Tags</h2>
                <p id="tag-links"><Link id='tag-items'>Cakes</Link>/<Link id='tag-items'>Choco</Link>/<Link id='tag-items'>CremeBrulee</Link>/<br /><Link id='tag-items'>Tasty</Link>/<Link id='tag-items'>Yummy</Link>/<Link id='tag-items'>Vanila</Link>/<br /><Link id='tag-items'>Cocoa</Link>/<Link id='tag-items'>Darkchocalate</Link>/<Link id='tag-items'>Whitechocalate</Link>/<br /><Link id='tag-items'>Cremme</Link>/<Link id='tag-items'>CB</Link></p>
            </div>

        </>
    )
}
