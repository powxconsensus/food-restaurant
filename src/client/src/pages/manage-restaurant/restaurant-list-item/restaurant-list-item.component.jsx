import axios from "axios";
import React from "react";
import { withRouter } from "../../../withRouter";
import "./restaurant-list-item.style.scss";

class RestaurantListItem extends React.Component {
  handleRemoveRestaurant = async (event) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `/fd/restaurant/${this.props.restaurant._id}`,
      });
      alert("request successful");
    } catch (err) {
      alert(err.message);
    }
  };
  render() {
    const { name, _id, address, images, applicationStatus } =
      this.props.restaurant;
    let image = `http://localhost:4000/fd/public/restaurant/${_id}/images/${images[0]}`;
    if (images[0] === "defaultRes.png")
      image = `http://localhost:4000/fd/public/default/defaultRes.png`;
    return (
      <div className="restaurant-list-item">
        <div className="imgdiv">
          <img src={image} alt="Image goes here" />
        </div>
        <div
          className="desc"
          onClick={() => this.props.navigate(`/manage-restaurant/${_id}`)}
        >
          {name}
        </div>
        {applicationStatus !== "rejected" ? (
          <button
            className="delete_button"
            onClick={this.handleRemoveRestaurant}
          >
            {applicationStatus === "accepted"
              ? "Remove Restaurant"
              : "Withdraw Application"}
          </button>
        ) : null}
      </div>
    );
  }
}

export default withRouter(RestaurantListItem);
