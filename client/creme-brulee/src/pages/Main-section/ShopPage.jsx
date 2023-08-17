import React from 'react'
import Shop from '../../components/Main/Shop'
import MainNav from '../../components/Nav/MainNav'
import Footer from '../../components/Main/Footer'

export default function ShopPage() {
    return (
        <>
            <div>
                <MainNav />
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12 col-12 col-md-12'>
                            <Shop />
                        </div>
                        <div className='footer'><Footer /></div>
                    </div>
                </div>



            </div>
        </>
    )
}
