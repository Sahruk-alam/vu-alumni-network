import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;