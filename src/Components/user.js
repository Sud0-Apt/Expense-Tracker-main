import React from "react";
import Home from "./home";
import Footer from "./footer";
import Work from "./work";
import Navbar from "./navbar";
import About from "./about";
import Testimonial from "./testimonial";
import Contact from "./contact";
import HomeUser from "./home_user";

const MainUser = () => {
    return (
        <div>
            <HomeUser />
            <About />
            <Work />
            <Contact />
            <Footer />
        </div>
    );
};

export default MainUser;