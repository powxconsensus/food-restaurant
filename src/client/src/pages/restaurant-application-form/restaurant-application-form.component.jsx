import React from "react";
import "./restaurant-application-form.style.scss";

class RestaurantApplication extends React.Component {
  constructor() {
    super();
    this.state = {
      // appplication detail
    };
  }
  render() {
    return (
      <div className="restaurant-application-page">
        <div class="form">
          <div class="title">Welcome</div>
          <div class="subtitle">Let's create your Restaurant!</div>
          <div class="input-container ic1">
            <input id="name" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="name" class="placeholder">Restaurant Name</label>
          </div>
          <div class="input-container ic1">
            <input id="contactNo" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="contactNo" class="placeholder">Contact number</label>
          </div>
          <div class="input-container ic2">
            <input id="description" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="description" class="placeholder">Description</label>
          </div>
          <div class="input-container ic2">
            <input id="address" class="input" type="text" placeholder=" " />
            <div class="cut cut-short"></div>
            <label for="address" class="placeholder">Address</label>
          </div>
          <button type="text" class="submit">submit</button>
        </div>
      </div>
    );
  }
}

export default RestaurantApplication;
