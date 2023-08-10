import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import OrderCupcake from '../../components/Main/OrderCupcake'
import Footer from '../../components/Main/Footer'
import Sidebar from '../../components/Main/Sidebar'

export default function OrderCupCakePg() {
  return (
   <>
    <div>
        <MainNav/>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-9 col-9 col-md-9'>
              <OrderCupcake />
            </div>
            <div className='col-lg-3 col-3 col-md-3' id='sidebar-fix'>
              <Sidebar />
            </div>
            <div className='footer'><Footer /></div>
          </div>
        </div>
        </div>
   
   </>
  )
}
