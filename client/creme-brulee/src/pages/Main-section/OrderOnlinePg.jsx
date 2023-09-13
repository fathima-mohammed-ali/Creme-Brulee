import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import OrderOnline from '../../components/Main/OrderOnline'
import Sidebar from '../../components/Main/Sidebar'
import Footer from '../../components/Main/Footer'
export default function OrderOnlinePg() {
  return (
   <>
   <div>
    <MainNav/>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-9 col-12 col-md-7'>
    <OrderOnline/>
    </div>
    <div className='col-md-5 col-lg-3 col-12' id='sidebar-fix'>
    <Sidebar/>
    </div>
    <div className='col-lg-12 col-md-12 col-6' id='footer'><Footer/></div>
    </div>
    </div>
   
   
   
   </div>
   </>
  )
}
