import React from "react";
import "./restaurant-list.style.scss";
import RestaurantListItem from "../restaurant-list-item/restaurant-list-item.component";
import axios from "axios";
import Loading from "../../../component/loading/loading.component";
class RestaurantList extends React.Component {
  constructor() {
    super();
    this.state = {
      filteredRestaurant: [],
      isLoading: true,
      prevStatus: "",
    };
  }
  async componentDidMount() {
    const response = await axios({
      method: "GET",
      url: `/fd/restaurant/mine?status=${this.props.status}`,
    });
    this.setState({
      filteredRestaurant: response.data.restaurants,
      isLoading: false,
      prevStatus: this.props.status,
    });
  }
  async componentDidUpdate() {
    if (this.state.prevStatus !== this.props.status) {
      const response = await axios({
        method: "GET",
        url: `/fd/restaurant/mine?status=${this.props.status}`,
      });
      this.setState({
        filteredRestaurant: response.data.restaurants,
        isLoading: false,
        prevStatus: this.props.status,
      });
    }
  }

  render() {
    const { filteredRestaurant, isLoading } = this.state;
    if (isLoading) return <Loading height="100px" width="100%" />;
    if (!filteredRestaurant.length)
      return (
        <div className="no-search-found">
          No restaurant is in {this.state.prevStatus} state
        </div>
      );
    return (
      <div className="restaurant-list">
        <div className="all-filtered-restaurant">
          {filteredRestaurant.map((restaurant, idx) => (
            <RestaurantListItem key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    );
  }
}

export default RestaurantList;
