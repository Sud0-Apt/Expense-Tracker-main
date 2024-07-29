import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage1 from "../Assets/home-banner-image.png";
import BannerImage from "../Assets/blue_dashboard.jpg";
import Navbar from "./navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div id="home-section" className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Track, Save, Thrive: Your Sassy Money Guide!
          </h1>
          <p className="primary-text">
          Tired of wondering where all your money went? 
          Say goodbye to financial mysteries and hello to PennyWise. Because every penny counts, and we make sure yours do too! 
          </p>
          <button className="secondary-button">
            Order Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
