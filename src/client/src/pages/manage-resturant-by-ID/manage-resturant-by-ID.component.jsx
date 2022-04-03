import React from "react";
import axios from "axios";
import "./manage-resturant-by-ID.style.scss";
import FoodItemList from "./foodItemList/foodItemList.component";
import { withRouter } from "../../withRouter";

class ManageRestaurantById extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      prevRestaurantId: "",
    };
  }
  async componentDidMount() {
    try {
      const { restaurantId } = this.props.params;
      const response = await axios({
        method: "GET",
        url: `/fd/restaurant/${restaurantId}`,
      });
      if (response.status == 200) {
        this.setState({
          prevRestaurantId: restaurantId,
          restaurant: response.data.restaurant,
        });
      }
    } catch (err) {
      alert(err.message);
    }
  }
  componentDidUpdate() {
    if (this.state.restaurantId !== this.props.params.restaurantId) {
    }
  }
  render() {
    const { restaurant } = this.state;
    return (
      <div className="manage-restaurant-ById">
        <div className="restaurant-name">{restaurant.name}</div>

        <div className="restraunt-info">
          <div className="imgdiv">Add image from backend here</div>

          <div className="describe-restaurant-data">
            {restaurant.description}
          </div>
        </div>

        <FoodItemList restaurantId={this.state.prevRestaurantId} />
      </div>
    );
  }
}

export default withRouter(ManageRestaurantById);
