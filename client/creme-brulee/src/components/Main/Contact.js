import React from 'react'
import './Main.css'
import{ LocalPhone,LocationOn,Facebook,Twitter,Pinterest,YouTube} from '@mui/icons-material/';
import { Button, Navbar, Nav, Container, Row, Col, NavbarBrand,ThemeProvider } from 'react-bootstrap';
export default function Contact() {
  return (
    <>
   
    <footer>
    <Row>
    <Col>
      <h6 id='footer-style'><LocalPhone style={{fontSize:"medium",color:"whitesmoke",marginRight:10,marginBottom:2}}/>Call us: +658 695 1123&nbsp;&nbsp;&nbsp;&nbsp;<LocationOn style={{fontSize:"medium",color:"whitesmoke",marginBottom:2}} /> Our Locations: Eight Avenue 487, NY&nbsp;&nbsp;&nbsp;&nbsp; Follow us:<Facebook style={{fontSize:"medium",color:"whitesmoke",marginRight:10,marginBottom:2,marginLeft:5}}/><Twitter style={{fontSize:"medium",color:"whitesmoke",marginRight:10,marginBottom:2}}/><Pinterest style={{fontSize:"medium",color:"whitesmoke",marginRight:10,marginBottom:2}}/><YouTube style={{fontSize:"medium",color:"whitesmoke",marginRight:5,marginBottom:2}}/></h6>
      </Col>   
    </Row> 
    </footer>
    </>
  )
}
