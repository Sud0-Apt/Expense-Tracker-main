import React from "react";
import { Link } from "react-router-dom";
import PickMeals from "../Assets/dashboard-1.png";
import ChooseMeals from "../Assets/view-trans.jpg";
import DeliveryMeals from "../Assets/visual.webp";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Dashboard",
      // text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
      link: "/addtransac"
    },
    {
       image: ChooseMeals,
       title: "View Transactions",
      //  text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
       link:"/transactions"
     },
     {
       image: DeliveryMeals,
       title: "Visualize your expenses",
      //  text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
       link:"/visualdash"
     },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        {/* <p className="primary-subheading">Work</p> */}
        <h1 className="primary-heading">Why Choose us?</h1>
        <p className="primary-text">
        Track Expenses Like a Boss: From lattes to luxury, keep tabs on every penny you spend.


        </p>
        <p className="primary-text">
        Set Goals & Crush Them: Want to save for a vacation or that shiny new gadget? We've got you covered.
        </p>
        <p className="primary-text">
        Insights That Wow: Our sleek charts and summaries make it easy to see where your money goes.
        </p>
      </div>
      
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <Link to={data.link} key = {data.title} className="work-section-info-link">
          <div className="work-section-info">
            <div className="info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work;
