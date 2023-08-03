import { TextField } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React from 'react'
import { Facebook, Instagram, Pinterest, Twitter, YouTube } from '@mui/icons-material';
export default function Footer() {
  return (
    <>
   <footer className='flex-container'>
   <div className='child-one'>
       <h1 style={{fontFamily:'Dancing script'}}><b>Creme Brulee</b></h1>
    </div>
    <div className='childe-two'>
       <ul id='footer-link' >
        <h4 style={{fontFamily:'Time of newman',fontSize:30}}>Useful Links</h4>
        <li><a id='useful-links' href=''>About Us</a></li>
        <li><a id='useful-links' href=''>History</a></li>
        <li><a id='useful-links' href=''>Our Location</a></li>
        <li><a id='useful-links' href=''>Today's Menu</a></li>
        <li><a id='useful-links' href=''>Blog</a></li>
        <li><a id='useful-links' href=''>Shop</a></li>
       </ul>
    </div>
    <div className='child-three'>
       <ul id='footer-link'>
        <h4 style={{fontFamily:'Time of newman',fontSize:30}}>Favourite</h4>
        <li><a id='useful-links' href=''>Chocalate Truffle</a></li>
        <li><a id='useful-links' href=''>American Cake</a></li>
        <li><a id='useful-links' href=''>Dutch Forest Cake</a></li>
        <li><a id='useful-links' href=''>Russian Cake</a></li>
        <li><a id='useful-links' href=''>Honey Cake</a></li>
       </ul>
    </div>
    <div className='child-four'>
        <h4  style={{fontFamily:'Time of newman',fontSize:30}}>Newsletter</h4>
        <p id='footer-para'>Subscribe to get special offers, free<br/> gifts and once-in-a-lifetime deals.</p>
        <TextField
          multiline
          type='email'
          placeholder="Enter Your Email"
          variant="standard"
          sx={{width:200}}
        />
        <MailOutlineIcon/>
        <p id='footer-icons'><Facebook style={{color:"black",marginRight:20,marginBottom:2,fontSize:20}}/><Twitter style={{color:"black",marginRight:20,marginBottom:2,fontSize:20}}/><Pinterest style={{color:"black",marginRight:20,marginBottom:2,fontSize:20}}/><YouTube style={{color:"black",marginRight:20,marginBottom:2,fontSize:20}}/><Instagram style={{fontSize:20}}/></p>
    </div>
   </footer>
    
    </>
  )
}
