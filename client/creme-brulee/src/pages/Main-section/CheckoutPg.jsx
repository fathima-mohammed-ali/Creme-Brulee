import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import Footer from '../../components/Main/Footer'
import Checkout from '../../components/Main/Checkout'

export default function CheckoutPg() {
    return (
        <>
            <div >
                <MainNav />
                <div >
                   <Checkout/>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
