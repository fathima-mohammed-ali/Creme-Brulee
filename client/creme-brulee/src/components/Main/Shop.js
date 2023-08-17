import React from 'react'
import Card from 'react-bootstrap/Card';
import { Button,Breadcrumb } from 'react-bootstrap';

export default function Shop() {
    return (
        <>
         <Breadcrumb style={{ marginTop: 150 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/add-items">
                    Add items
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/add-items">
                    Back to Page
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>

               <div className='col-lg-6 col-6 col-md-6'>
                
               </div>
           
        </>
    )
}
