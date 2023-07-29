import React from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import AOS from 'aos';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  marginTop: 100,
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));


export default function Profile() {
  useEffect(() => {
    AOS.init({
      duration:1500
    });
  }, []);

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>


      <Box sx={{ width: 1050, minHeight: 829,marginLeft:10 }} >
        <Masonry className='masonry' columns={3} spacing={2} >
          {itemData.map((item, index) => (
            <div key={index}>
              <Label>{index+1}</Label>
              <img
                src={`${item.img}?w=162&auto=format`}
                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',

                }}
                data-aos="fade-up"
              />
            </div>

          ))}

        </Masonry>

      </Box>
      {/* 

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas> */}

    </>
  )
}
const itemData = [
  {
    img: 'https://images.pexels.com/photos/4403082/pexels-photo-4403082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Chocalate Cake',
  },
  {
    img: 'https://images.pexels.com/photos/13024205/pexels-photo-13024205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Castle Cake',
  },
  {
    img: 'https://images.pexels.com/photos/14493566/pexels-photo-14493566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Chocalate Fantacy',
  },
  {
    img: 'https://images.pexels.com/photos/14000022/pexels-photo-14000022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Tower Cake',
  },
  {
    img: 'https://images.pexels.com/photos/4664308/pexels-photo-4664308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'White Bubble Cake',
  },
  {
    img: 'https://images.pexels.com/photos/14392121/pexels-photo-14392121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Honey Cake',
  },
  {
    img: 'https://images.pexels.com/photos/8732763/pexels-photo-8732763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Creme Cake',
  },
  {
    img: 'https://images.pexels.com/photos/16336316/pexels-photo-16336316/free-photo-of-chocolate-cake-with-cream-on-plate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Chocalate Cake with Creme',
  },
  {
    img: 'https://images.pexels.com/photos/12065268/pexels-photo-12065268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Wedding Cake',
  },
  {
    img: 'https://images.pexels.com/photos/8820960/pexels-photo-8820960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Blue Berry Cake',
  },
  {
    img: 'https://images.pexels.com/photos/8277765/pexels-photo-8277765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Wedding Cake',
  },
  {
    img: 'https://images.pexels.com/photos/5732158/pexels-photo-5732158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Coffee',
  },
  {
    img: 'https://images.pexels.com/photos/4639525/pexels-photo-4639525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: '4-tier Weddin Cake',
  },
  {
    img: 'https://images.pexels.com/photos/9974583/pexels-photo-9974583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Floral Design Cake',
  },
  {
    img: 'https://images.pexels.com/photos/2684556/pexels-photo-2684556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Honey Cake',
  },
  {
    img: 'https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Fruit Cake',
  },
  {
    img: 'https://images.pexels.com/photos/7235675/pexels-photo-7235675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Theme Cake',
  },
];



