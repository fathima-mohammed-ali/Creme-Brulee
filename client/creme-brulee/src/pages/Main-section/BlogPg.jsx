import React from 'react'
import Blog from '../../components/Main/Blog'
import MainNav from '../../components/Nav/MainNav'
import Footer from '../../components/Main/Footer'

export default function BlogPg() {
  return (
   <>
    <div className='container-fluid'>
    <MainNav/>
    <Blog/>
   </div>
   <div className='footer mt-4'>
    <Footer/>
   </div>
   </>
  )
}
