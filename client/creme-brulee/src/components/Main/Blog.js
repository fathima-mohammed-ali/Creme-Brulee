import React, { useState } from 'react'
import './Main.css'
import { Button } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import Avatar from '@mui/material/Avatar';
import { Facebook, YouTube, Pinterest, Twitter, Instagram, Cake } from '@mui/icons-material';
import { Link } from 'react-router-dom';
    export default function Blog() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

        return (
            <>
                <div className='blog'>
                    <div className='left-part col-12 col-lg-4 col-md-7'>
                        <img style={{ width: 400 }} className='img-fluid' src='https://images.pexels.com/photos/3060255/pexels-photo-3060255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img>
                    </div>
                    <div className='right-part col-12 col-lg-5 col-md-6 ms-5 '>
                        <h2 className='text-left' style={{ fontFamily: "dancing script", fontSize: "8vh", color: "white" }}>Our Choco Story</h2>
                        <p className='text-left' style={{ fontFamily: "cursive", fontSize: "3vh", color: 'white', }}>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit, <br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /> Ut enim ad minim veniam,<br /> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br />Duis aute irure dolor in reprehender eu fugiat nulla pariatur.<br /> Excepteur sint occaecat cupidatat</p>
                        <p id='ourchoco-para2' style={{ fontFamily: "cursive", fontSize: "3vh", color: "white" }}>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit, <br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className='col-lg-4 col-12'>
                        <h2 className='text-center' style={{ fontFamily: "Times new roman", marginTop: 100, fontSize: "2.5vh", color: "gold" }}>MAGICAL</h2>
                        <h2 className='text-center' style={{ fontFamily: "Times new roman", fontSize: "6vh", color: "white", marginTop: 20,  }}>CREATION</h2>
                        <p className='text-center'  style={{ color: "white", marginTop: 30, fontFamily: "cursive", fontSize: "2.5vh" }}>Lorem ipsum dolor sit amet,consectetur adipiscing elit,<br />  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua<br />Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi <br />ut aliquip ex ea commodo consequat.</p>
                        <p className='text-center'  style={{ color: "white", fontFamily: "cursive", fontSize: "2.5vh" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className='text-center'>
                        <Button variant='outline-light' className=''>Read More</Button>
                        </div>
                    </div>
                    <div className='col-lg-4 col-12 text-center'>
                        <img  className='img-fluid' style={{ width: 300, marginTop: 100 }} src='https://images.pexels.com/photos/2067419/pexels-photo-2067419.jpeg'></img>
                    </div>
                    <div className='col-lg-4 col-12'>
                        <h2 className='text-center' style={{ fontFamily: "Times new roman", marginTop: 100, fontSize: "2.5vh", color: "gold" }}>SWEET</h2>
                        <h2 className='text-center' style={{ fontFamily: "Times new roman", fontSize: "6vh", color: "white", marginTop: 20 }}>MASTERPIECES</h2>
                        <p className='text-center'  style={{ color: "white", marginTop: 30, fontFamily: "cursive", fontSize: "2.5vh" }}>Lorem ipsum dolor sit amet,consectetur adipiscing elit,<br />  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua<br />Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi <br />ut aliquip ex ea commodo consequat.</p>
                        <p className='text-center' style={{ color: "white", fontFamily: "cursive", fontSize: "2.5vh" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className='text-center'>
                        <Button variant='outline-light' className=''>Read More</Button>
                        </div>
                    </div>
                    <div className='col-lg-9 col-11 text-center'>
                        <img className='img-fluid ms-4' style={{ width: 700, marginTop: 100 }} src='https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/blog-single-img-1.jpg' ></img>
                        <h4 style={{ fontFamily: "Times new roman", marginTop: 50, fontSize: "2.5vh" }} className='text-white text-center'>JANUARY 26, 2023 SPECIALITIES</h4>
                        <h1 style={{ fontFamily: "Times new roman", marginTop: 20, fontSize: "6vh" }} className='text-white text-center'>TRADITION IN EVERY DELICACY EVER</h1>
                        <p id='creation-para' style={{ color: "white", fontFamily: "cursive", fontSize: "2.5vh", marginBottom: 100,marginLeft:50 }} className='text-white text-start'>Lorem ipsum dolor sit amet, novum temporibus ea sea, explicari voluptaria an vim. In has adhuc audire. Quot recteque pro ex. Per at lorem possit aliquando, tantas dissentiunt sit ad, ei posse dissentias eum. No liber facilisi quo, ad vis elit solum nonumes. At ius dico erant elaboraret, id possim vocent omittantur mei, usu dicunt nostrud accusam ex. Vero graecis ei per, ut per aliquip percipit. In mei assum singulis, persius patrioque te vim, qui etiam epicuri ex. Sit mentitum electram temporibus ut. Ex fugit soluta graeco vim. Ad duo facer melius alterum. Id vis indoctum assentior, augue dicit theophrastus ad ius. Mei albucius erroribus ocurreret ne, vix evertitur.</p>
                        <div className='border col-12 col-md-12 col-lg-12 text-center'>
                            <h3 className='text-center responsive-text'><p  style={{fontFamily:"dancing of script",fontSize:"12vh"}} className='text-center'>"</p>LOREM IPSUM DOLOR SIT AMET,<br/> CONSECTE ADIPISCING ELIT SED</h3>
                            <h6 style={{fontFamily:"monospace",fontSize:"3vh"}} className='text-center responsive-text pt-3'>Jean-Luc Boulay</h6>
                        </div>
                    </div>
                    <div className='col-lg-3 col-12 text-center  d-flex flex-column align-items-center '>
                        <Avatar  className='img-fluid mt-5' sx={{ width: 200, height: 200 }} alt="Remy Sharp" src="https://media.istockphoto.com/photos/small-business-owner-picture-id648323658" />
                        <h4 style={{ fontFamily: "Times new roman", fontSize: "4vh", color: "white", marginTop: 20 }}>ASHLEY WILSON</h4>
                        <p  style={{ color: "white", fontFamily: "cursive", fontSize: "2.5vh" }} >Introducing Creme Brulee Wonders,<br></br>Hello every one thank you for choosing us..</p>
                        <p   id='footer-icons'><Facebook style={{ color: "white",  marginBottom: 2, fontSize: 20 }} /><Twitter style={{ color: "white", marginLeft: 20, marginBottom: 2, fontSize: 20 }} /><Pinterest style={{ color: "white", marginLeft: 20, marginBottom: 2, fontSize: 20 }} /><YouTube style={{ color: "white", marginLeft: 20, marginBottom: 2, fontSize: 20 }} /><Instagram style={{ color: "white", marginLeft: 20, fontSize: 20 }} /></p>
                        <ul>
                            <h2 className='text-white ms-3' style={{ fontFamily: 'dancing script', marginTop: 50 }}>Categories</h2>
                            <li id='items'><Link id='linkItems' to={'/order-cake'}>Cake</Link></li>
                            <li id='items'><Link id='linkItems' to={'/order-donut'}>Donuts</Link></li>
                            <li id='items'><Link id='linkItems' to={'/order-dessert'}>Desert</Link></li>
                            <li id='items'><Link id='linkItems' to={'/order-cupcake'}>Cup Cakes</Link></li>
                        </ul>
                        <h2 id='tags' className='text-white ms-5'>Tags</h2>
                        <p className='ms-5' id="tag-links"><Link id='tag-items'>Cakes</Link>/<Link id='tag-items'>Choco</Link>/<Link id='tag-items'>CremeBrulee</Link>/<br /><Link id='tag-items'>Tasty</Link>/<Link id='tag-items'>Yummy</Link>/<Link id='tag-items'>Vanila</Link>/<br /><Link id='tag-items'>Cocoa</Link>/<Link id='tag-items'>Darkchocalate</Link>/<Link id='tag-items'>Whitechocalate</Link>/<br /><Link id='tag-items'>Cremme</Link>/<Link id='tag-items'>CB</Link></p>
                    </div>
                    <div className='col-lg-9 col-11 text-center '>
                        <Carousel className='carousel' activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img className='img-fluid' style={{width:700}} src='https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/blog-single-gallery-img-6.jpg'></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className='img-fluid' style={{width:700}} src='https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/blog-single-gallery-img-2.jpg'></img>
                            </Carousel.Item>
                            <Carousel.Item>
                               <img className='img-fluid' style={{width:700}} src='https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/01/blog-single-img-12.jpg'></img>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className='col-lg-9'>
                    <h4 style={{ fontFamily: "Times new roman", marginTop: 50, fontSize: "2.5vh" }} className='text-white text-center'>JANUARY 28, 2023 SPECIALITIES</h4> 
                    <h1 style={{ fontFamily: "Times new roman", marginTop: 20, fontSize: "6vh" }} className='text-white text-center'>SUPREME COCOA FLAVOUR</h1>
                    <p id='creation-para' style={{ color: "white", fontFamily: "cursive", fontSize: "2.5vh", marginBottom: 100,marginLeft:50 }} className='text-white text-start'>Lorem ipsum dolor sit amet, novum temporibus ea sea, explicari voluptaria an vim. In has adhuc audire. Quot recteque pro ex. Per at lorem possit aliquando, tantas dissentiunt sit ad, ei posse dissentias eum. No liber facilisi quo, ad vis elit solum nonumes. At ius dico erant elaboraret, id possim vocent omittantur mei, usu dicunt nostrud accusam ex. Vero graecis ei per, ut per aliquip percipit. In mei assum singulis, persius patrioque te vim, qui etiam epicuri ex. Sit mentitum electram temporibus ut. Ex fugit soluta graeco vim. Ad duo facer melius alterum. Id vis indoctum assentior, augue dicit theophrastus ad ius. Mei albucius erroribus ocurreret ne, vix evertitur.</p>
                    </div>
                    <div className='border col-lg-12 col-md-12 col-12'>
                            <h3 className='text-center responsive-text'><Cake style={{fontSize:50,marginTop:10}}/><p  style={{fontFamily:"dancing of script",fontSize:"12vh"}} className='text-center'></p>LOREM IPSUM DOLOR SIT AMET,<br/> CONSECTE ADIPISCING ELIT SED</h3>
                            <h6 style={{fontFamily:"monospace",fontSize:"3vh"}} className='text-center responsive-text pt-3'>Jean-Luc Boulay</h6>
                        </div>
                        <div className='col-lg-9 col-11'>
                        <img style={{ width: 700, marginTop: 100 }} src='https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/blog-single-img-5.jpg' className='img-fluid ms-4'></img>
                        <h4 style={{ fontFamily: "Times new roman", marginTop: 50, fontSize: "2.5vh" }} className='text-white text-center'>JANUARY 29, 2023 SPECIALITIES</h4>
                        <h1 style={{ fontFamily: "Times new roman", marginTop: 20, fontSize: "6vh" }} className='text-white text-center'>BROWNIES TO DIE FOR</h1>
                        <p id='creation-para' style={{ color: "white", fontFamily: "cursive", fontSize: "2.5vh", marginBottom: 100,marginLeft:50 }} className='text-white text-start'>Lorem ipsum dolor sit amet, novum temporibus ea sea, explicari voluptaria an vim. In has adhuc audire. Quot recteque pro ex. Per at lorem possit aliquando, tantas dissentiunt sit ad, ei posse dissentias eum. No liber facilisi quo, ad vis elit solum nonumes. At ius dico erant elaboraret, id possim vocent omittantur mei, usu dicunt nostrud accusam ex. Vero graecis ei per, ut per aliquip percipit. In mei assum singulis, persius patrioque te vim, qui etiam epicuri ex. Sit mentitum electram temporibus ut. Ex fugit soluta graeco vim. Ad duo facer melius alterum. Id vis indoctum assentior, augue dicit theophrastus ad ius. Mei albucius erroribus ocurreret ne, vix evertitur.</p>
                       </div>
                </div>
            </>
        )
    }
