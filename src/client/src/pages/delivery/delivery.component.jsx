import React from "react";
import "./delivery.style.scss";

const Delivery = () => {
  return (
    <div className="delivery-container">
      <div className="heading">
        <h2>Delivery</h2>
      </div>
      <div className="content">
        <ul>
          <li>
            <p>
              All our delivery persons have their temperature checked before
              going out for delivery and all the containers are sanitizer every
              time.
            </p>
          </li>
          <li>
            <p>
              We also have an option for no - contact delivery where we deliver
              the food to your doorstep provided it is a prepaid order
            </p>
          </li>
          <li>
            <p>
              We monitor health of delivery guys if they some symptoms of covid
              we just send them for medication and treatment. They get back to
              work after full clearance.
            </p>
          </li>
          <li>
            <p>All of our company member are fully vaccinated.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Delivery;
