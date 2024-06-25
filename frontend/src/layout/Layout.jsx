import React from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers' 

const Layout = () => {
    return (
        <>
            <Header/>
            <main>
                <Routers/>
            </main>
            <Footer/>  {/* Corrected from <Footers/> to <Footer/> */}
        </>
    );
};

export default Layout;
