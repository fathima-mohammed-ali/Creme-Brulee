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
         <Home />
        <Contact />
      </div>
    </>
  )
}
