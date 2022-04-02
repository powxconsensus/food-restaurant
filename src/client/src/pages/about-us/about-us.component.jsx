import "./about-us.style.scss";
import { Helmet } from "react-helmet";

// about the food for foodies food delivery app

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>{"About Us"}</title>
      </Helmet>
      <div className="about-us">
        <div className="about-us-heading">About Us</div>
        <div className="aboutus-content">
          Living in a city ,we never have enough time to do all the things we
          want to do. Food for foodies can change the way you move things
          around,it enables you access restaurents in your city like never
          before.This app connects you to remote restaurent in the city bring
          them to you.
          <br />
          All you need to do is ,
          <br />
          Just select food from restaurent.
          <br />
          Whats happens next?Sit back,and let us worry about your task-at-hand.
        </div>
      </div>
    </>
  );
};

export default AboutUs;
