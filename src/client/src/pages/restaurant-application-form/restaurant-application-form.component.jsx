import React from "react";
import { withRouter } from "./../../withRouter";
import axios from "axios";
import "./restaurant-application-form.style.scss";

class RestaurantApplication extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      address: "",
      contactNo: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, description, address, contactNo } = this.state;
    if (!name || !description || !address || !contactNo)
      return alert("provide all data");
    try {
      const response = await axios({
        method: "POST",
        url: "/fd/restaurant",
        data: { name, description, address, contactNo },
      });
      console.log(response);
      if (response.status === 200) {
        this.props.navigate("/manage-restaurant");
        window.location.reload(false);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="restaurant-application-page">
        <div class="restaurant-application-form">
          <div class="title">Welcome</div>
          <div class="subtitle">Let's create your Restaurant!</div>
          <div class="input-container ic1">
            <input
              id="name"
              class="input"
              type="text"
              placeholder=" "
              name="name"
              onChange={this.handleOnChange}
            />
            <div class="cut"></div>
            <label for="name" class="placeholder">
              Restaurant Name
            </label>
          </div>
          <div class="input-container ic1">
            <input
              id="contactNo"
              name="contactNo"
              class="input"
              type="text"
              placeholder=" "
              onChange={this.handleOnChange}
            />
            <div class="cut"></div>
            <label for="contactNo" class="placeholder">
              Contact number
            </label>
          </div>
          <div class="input-container ic2">
            <input
              id="description"
              name="description"
              class="input"
              type="text"
              placeholder=" "
              onChange={this.handleOnChange}
            />
            <div class="cut"></div>
            <label for="description" class="placeholder">
              Description
            </label>
          </div>
          <div class="input-container ic2">
            <input
              id="address"
              class="input"
              type="text"
              placeholder=" "
              name="address"
              onChange={this.handleOnChange}
            />
            <div class="cut cut-short"></div>
            <label for="address" class="placeholder">
              Address
            </label>
          </div>
          <div type="text" class="submit" onClick={this.handleSubmit}>
            submit
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RestaurantApplication);
