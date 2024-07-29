import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div id="about-section" className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Welcome to your ultimate financial sidekick!
        </h1>
        <p className="primary-text">
        Our expense tracker system is designed to simplify and enhance your financial management.
        With intuitive tracking, smart savings features, and insightful analytics, 
        you can effortlessly monitor your spending, plan your budget, and achieve your financial goals. 
         
        </p>
        <p className="primary-text">
        Take charge of your finances and make informed decisions with ease and style.
        Transform the way you handle money and pave the path to financial success!
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
