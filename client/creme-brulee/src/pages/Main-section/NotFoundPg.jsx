import React from 'react'
import MainNav from '../../components/Nav/MainNav'
import Footer from '../../components/Main/Footer'
import NotFound from '../../components/Main/NotFound'
function NotFoundPg() {
    return (
        <>
            <MainNav />
            <div>
                <NotFound/>
            </div>

            <Footer />

        </>
    )
}

export default NotFoundPg