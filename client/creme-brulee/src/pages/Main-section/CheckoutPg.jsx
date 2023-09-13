import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import Checkout from '../../components/Main/Checkout'
import Footer from '../../components/Main/Footer'

export default function CheckoutPg() {
    return (
        <>
            <div>
                <MainNav />
                <div>
                    <Checkout />
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        </>
    )
}
