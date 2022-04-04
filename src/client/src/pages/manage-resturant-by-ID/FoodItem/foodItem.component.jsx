import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

import "./foodItem.style.scss";
import axios from "axios";

class FoodItem extends React.Component {
  constructor() {
    super();
    this.state = {
      toExtend: false,
      name: "",
      description: "",
      pricePerQuantity: "",
      quantity: "",
      imageValue: "",
      image: {},
    };
  }
  componentDidMount() {
    const { name, description, pricePerQuantity, quantity } =
      this.props.foodItem;
    this.setState({ name, description, pricePerQuantity, quantity });
  }
  handleSubmit = async (event) => {
    let { name, description, pricePerQuantity, quantity } = this.state;
    const { foodItem } = this.props;
    try {
      const { _id, restaurant } = foodItem;
      name = name || foodItem.name;
      description = description || foodItem.description;
      pricePerQuantity = pricePerQuantity || foodItem.pricePerQuantity;
      quantity = quantity || foodItem.quantity;

      const response = await axios({
        method: "PATCH",
        url: `/fd/foodItem/${_id}/restaurant/${restaurant}`,
        data: {
          name,
          description,
          pricePerQuantity,
          quantity,
        },
      });
      alert("edited successfully");
    } catch (err) {
      alert(err.message);
    }
  };
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleRemove = async (event) => {
    try {
      await axios({
        method: "DELETE",
        url: `/fd/foodItem/${this.props.foodItem._id}`,
      });
      alert("deleted succesfully");
    } catch (err) {
      alert(err.message);
    }
  };
  render() {
    const { toExtend } = this.state;
    return (
      <div
        className="food-item"
        style={{
          paddingBottom: `${toExtend ? "0px" : ""}`,
        }}
      >
        <div className="two-component">
          <div className="food-item-img">
            <img src="https://bit.ly/3KhrRXe" alt="food-image-goes here" />
          </div>
          <div className="food-describe">{this.props.foodItem.name}</div>
          <div className="fooditem-operations">
            <div
              className="edit-food-item food-item-operation "
              onClick={(event) => this.setState({ toExtend: !toExtend })}
            >
              <BiEditAlt />
            </div>
            <div
              className="remove-food-item food-item-operation"
              onClick={this.handleRemove}
            >
              <RiDeleteBin5Fill />
            </div>
          </div>
        </div>
        {toExtend ? (
          <div className="extend-this-edit-option">
            <p>Edit</p>
            <div className="food-item-edit-form">
              <div className="fi-input-field">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="fi-input-field">
                <label htmlFor="description">description: </label>
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="fi-input-field">
                <label htmlFor="pricePerQuantity">pricePerQuantity: </label>
                <input
                  type="text"
                  name="pricePerQuantity"
                  value={this.state.pricePerQuantity}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="fi-input-field">
                <label htmlFor="quantity">quantity: </label>
                <input
                  type="text"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="fi-input-field">
                <label htmlFor="image">Add Food Image: </label>
                <input
                  type="file"
                  name="image"
                  value={this.state.imageValue}
                  onChange={(event) => {
                    this.setState({
                      image: event.target.files[0],
                      imageValue: event.target.value,
                    });
                  }}
                />
              </div>

              <div className="save-btn" onClick={this.handleSubmit}>
                Save
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FoodItem;
