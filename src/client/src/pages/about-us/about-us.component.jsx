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
          We've all had a craving to eat that delicious masala dosa with the best chutney, or that
          mouth watering panneer butter masala from that one place on the other side of the city
          that's too far to go to.
          <br /><br />
          With food for foodies, we bring food that's miles away from your home to your fingertips!
          <br /><br />
          Why bother driving all the way to your favourite restaurant when you can have someone
          bring the restaurant to you ?
        </div>
      </div>
    </>
  );
};

export default AboutUs;
