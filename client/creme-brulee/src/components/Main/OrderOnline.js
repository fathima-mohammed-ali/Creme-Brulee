import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactCardFlip from "react-card-flip";
import './Main.css'
export default function OrderOnline() {
    const [flip, setFlip] = useState(false);
    const [fliptwo, setFliptwo] = useState(false);
    const [flipthree, setFlipthree] = useState(false);
    return (
        <>


            <div className='flex-container'>
                <ReactCardFlip isFlipped={flip}
                    flipDirection="vertical">
                    <div className='card-one'>
                        <Card style={{ width: '18rem', marginTop: 150, marginLeft: 50 }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => setFlip(!flip)}>Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        // height: '200px',
                        background: '#fbd7f8',
                        fontSize: '40px',
                        color: 'blue',
                        marginTop: 150,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                        // padding: '20px'
                    }}>
                        Computer Science Portal.
                        <br />
                        <Button style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '20px',
                            background: '#f5d9fa',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlip(!flip)}>
                            Flip</Button>
                    </div>
                </ReactCardFlip>

                <ReactCardFlip isFlipped={fliptwo}
                    flipDirection="vertical">
                    <div className='card-two'>
                        <Card style={{ width: '18rem', marginTop: 150, marginLeft: 20 }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => setFliptwo(!fliptwo)}>Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        // height: '200px',
                        background: '#fbd7f8',
                        fontSize: '40px',
                        color: 'blue',
                        marginTop: 150,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                        // padding: '20px'
                    }}>
                        Computer Science Portal.
                        <br />
                        <Button style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '20px',
                            background: '#f5d9fa',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFliptwo(!fliptwo)}>
                            Flip</Button>
                    </div>
                </ReactCardFlip>


                <ReactCardFlip isFlipped={flipthree}
                    flipDirection="vertical">
                    <div className='card-three'>
                        <Card style={{ width: '18rem', marginTop: 150, marginLeft: 20 }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => setFlipthree(!flipthree)}>Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{
                        width: '18rem',
                        // height: '200px',
                        background: '#fbd7f8',
                        fontSize: '40px',
                        color: 'blue',
                        marginTop: 150,
                        marginLeft: 50,
                        borderRadius: '4px',
                        textAlign: 'center',
                        // padding: '20px'
                    }}>
                        Computer Science Portal.
                        <br />
                        <Button style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '20px',
                            background: '#f5d9fa',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlipthree(!flipthree)}>
                            Flip</Button>
                    </div>


                </ReactCardFlip>
            </div>



        </>

    )
}
