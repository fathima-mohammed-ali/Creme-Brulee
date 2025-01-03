import React from 'react'
import './Main.css'
import { LocalPhone, LocationOn,Instagram, Facebook, Twitter, Pinterest, YouTube } from '@mui/icons-material/';
import { Button, Navbar, Nav, Container, Row, Col, NavbarBrand, ThemeProvider } from 'react-bootstrap';
export default function Contact() {
  return (
    <>

<footer className="home-footer">
  <Row className="footer-row">
    {/* Contact Information */}
    <Col xs={12} md={6} className="footer-col">
      <h6 id="footer-style">
        <LocalPhone style={{ marginRight: '8px' }} />
        Call us: +658 695 1123
      </h6>
      <h6 id="footer-style">
        <LocationOn style={{ marginRight: '8px' }} />
        Our Locations: Eight Avenue 487, NY
      </h6>
    </Col>

    {/* Social Media Links */}
    <Col xs={12} md={6} className="footer-col">
      <h6 id="footer-style">
        Follow us:
        <Facebook style={{ marginLeft: '8px', cursor: 'pointer' }} />
        <Twitter style={{ marginLeft: '8px', cursor: 'pointer' }} />
        <Instagram style={{ marginLeft: '8px', cursor: 'pointer' }}/>
        <YouTube style={{ marginLeft: '8px', cursor: 'pointer' }}/>
      </h6>
    </Col>
  </Row>
</footer>

    </>
  )
}
