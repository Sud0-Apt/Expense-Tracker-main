import React from "react";
import Home from "./home";
import Footer from "./footer";
import Work from "./work";
import Navbar from "./navbar";
import About from "./about";
import Testimonial from "./testimonial";
import Contact from "./contact";

const Main = () => {
    return (
        <div>
            <Home />
            <About />
            <Work />
            <Contact />
            <Footer />
        </div>
    );
};

export default Main;