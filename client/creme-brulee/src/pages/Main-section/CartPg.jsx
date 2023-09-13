import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import Cart from '../../components/Main/Cart'
import Footer from '../../components/Main/Footer'
export default function CartPg() {
    return (
        <>
            <div>
                <MainNav />
                <div>
                    <Cart />
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        </>
    )
}
