import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { toggleAddFoodWindow } from "../../../redux/toggle/toggle.actions";
import "./add-food-item.style.scss";

class AddFoodItem extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      pricePerQuantity: "",
      description: "",
      quantity: "",
    };
  }
  handleSubmit = async (event) => {
    const { name, pricePerQuantity, description, quantity } = this.state;
    if (!name || !pricePerQuantity || !description || !quantity)
      return alert("Enter all information");
    try {
      const response = await axios({
        method: "POST",
        url: `/fd/foodItem`,
        data: {
          name,
          pricePerQuantity,
          description,
          quantity,
          restaurantId: this.props.currentRestaurant,
        },
      });
      this.props.toggleAddFoodWindow(false);
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
      <div
        className="add-food-item"
        onClick={(event) => {
          if (event.target.className === "add-food-item")
            this.props.toggleAddFoodWindow(false);
        }}
      >
        <div className="add-food-item-box">
          <h2>Add Food Item</h2>

          <div className="input-field name">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" onChange={this.handleOnChange} />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              name="description"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="pricePerQuantity">Price Per Quantity: </label>
            <input
              type="text"
              name="pricePerQuantity"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="quantity">Quantity: </label>
            <input type="text" name="quantity" onChange={this.handleOnChange} />
          </div>
          <div className="submit-btn" onClick={this.handleSubmit}>
            Add
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentRestaurant: state.restaurant.currentRestaurant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddFoodWindow: (payload) => dispatch(toggleAddFoodWindow(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFoodItem);
