import React from 'react'
import Home from '../../components/Main/Home'
import './MainPg.css'
import MainNav from '../../components/Nav/MainNav'
import Contact from '../../components/Main/Contact'
export default function HomePage() {
  return (
    <>
    
      <div className='container-fluid'>
        <MainNav />
          <div className='row'>
            <div className='col-12 col-md-12 col-lg-12'>
          <Home />
          </div>
          </div>
        <Contact />
      </div>
    </>
  )
}
