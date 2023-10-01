import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import MyOrder from '../../components/Main/MyOrder'
import Footer from '../../components/Main/Footer'

export default function MyOrderPg() {
  return (
    <>
    <div>
                <MainNav />
                <div>
                    <MyOrder />
                </div>
                <div className='footer' >
                    <Footer />
                </div>
            </div>
    </>
  )
}
