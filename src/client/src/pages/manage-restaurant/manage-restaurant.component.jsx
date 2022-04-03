import React from "react";
import { withRouter } from "../../withRouter";
import "./manage-restaurant.style.scss";
import RestaurantList from "./restaurant-list/restaurant-list.component";

class ManageRestaurant extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "accepted",
    };
  }
  render() {
    const { status } = this.state;
    return (
      <div className="manage-restaurant-page">
        <p>Manage your restaurants</p>
        <div className="filter-restaurant-by-status">
          <div
            className="filter-button"
            style={{
              backgroundColor: `${status == "accepted" ? "green" : ""}`,
            }}
            onClick={() => this.setState({ status: "accepted" })}
          >
            Accepted
          </div>
          <div
            className="filter-button"
            style={{
              backgroundColor: `${status == "processing" ? "green" : ""}`,
            }}
            onClick={() => this.setState({ status: "processing" })}
          >
            Pending
          </div>
          <div
            className="filter-button"
            style={{
              backgroundColor: `${status == "rejected" ? "green" : ""}`,
            }}
            onClick={() => this.setState({ status: "rejected" })}
          >
            Rejected
          </div>
        </div>
        <RestaurantList {...this.state} />
        <div
          className="restaurant-application-button"
          onClick={() => this.props.navigate("/restaurant-application")}
        >
          Apply for new Restaurant
        </div>
      </div>
    );
  }
}

export default withRouter(ManageRestaurant);
