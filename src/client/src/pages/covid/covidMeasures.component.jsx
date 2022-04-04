import React from "react";
import "./covidMeasures.style.scss";

// a page for the covid measures taken for the food delivery


const CovidMeasures = () => {
  return (
    <div className="covid-container">
      <div className="heading">
        <h2>C o v i d M e a s u r e s</h2>
      </div>
      <div className="content">

        <br /><br />
        We at FoodForFoodies take safety and hygiene very seriously. Apart from all the checks that
        are in place, we also offer contactless Delivery.
        <br /><br />
        Here are some of our safety measures:
        <br />
        1. Ensuring that all the restaurants frequently sanitize kitchens, door handles, counter etc.
        <br /><br />
        2. Restaurant employees are required wash their hands regularly. Our delivery persons wash
        their hands before and every deliver run.
        <br /><br />
        3. Your food is not touched after its cooked in the restaurant. It stays isolated inside an
        aluminium foil to keep it warm and safe.
        <br />
        <br />
        CONTACTLESS DELIVERY is available as delivery option
        <br /><br />
        *Prepayment and pre tips are included
        <br />
        *The delivery person will notify you the order arrived and may call you.
        <br />
        *They will place your order on a clean and safe surface in the location
        that you are specified.
        <br />
        *Please wait until your delivery expert is 6 feet away from you before
        you collect your order
      </div>
    </div>
  );
};

export default CovidMeasures;
