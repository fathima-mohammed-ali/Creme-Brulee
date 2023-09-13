import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import Payment from '../../components/Main/Payment'
import Footer from '../../components/Main/Footer'
export default function PaymentPg() {
  return (
   <>
     <div>
                <MainNav />
                <div>
                    <Payment />
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
   </>
  )
}
