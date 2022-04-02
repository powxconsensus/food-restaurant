import React from "react";
import "./covidMeasures.style.scss";

// a page for the covid measures taken for the food delivery


const CovidMeasures = () => {
  return (
    <div className="covid-container">
      <div className="heading">
        <h2>Covid Measures</h2>
      </div>
      <div className="content">
        SAFETY IS FOODFORFOODIES PRIROTY
        <br />
        At foodforfoodies,we understand that food safety is on everyones mind
        during this pandemic and take food safety concernsvery seriously.To
        ensure this we are offering CONTACTLESS Delivery.
        <br />
        Heres how restaurents takes Precautions very seriously:
        <br />
        1.Sanitizing all the restaurents frequently sanitize food preparing
        areas,door handles,counters and more
        <br />
        2.Restautents employees must wash their hands after touching any
        surface,and delivery drivers wash their hands before and every deliver
        run.
        <br />
        3.Your food is not touched after its cooked in the store.It get packed
        in alumunium wrappers with heat on it.
        <br />
        <br />
        CONTACT LESS DELIVERY is available as delivery option
        <br />
        *Prepayment and pre tips are included
        <br />
        *The delivery expert will notify you the order arrived and may call you.
        <br />
        *They will place your order on a clean and safe surface in the location
        that you are specified.
        <br />
        *Please wait until your delivery expert is 7 feet away from you before
        you collect your order
      </div>
    </div>
  );
};

export default CovidMeasures;
