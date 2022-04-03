import React from "react";
import axios from "axios";
import FoodItem from "./../FoodItem/foodItem.component";
import "./foodItemList.style.scss";
import { connect } from "react-redux";
import Loading from "../../../component/loading/loading.component";
import { toggleAddFoodWindow } from "../../../redux/toggle/toggle.actions";
import { setCurrentRestaurant } from "../../../redux/restaurant/restaurant.actions";

class FoodItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      foodItemList: [],
      prevRestaurantId: "",
      isLoading: true,
      isAddFoodFormOpen: false,
    };
  }
  async componentDidMount() {
    if (!this.props.restaurantId) return;
    try {
      const response = await axios({
        method: "GET",
        url: `/fd/foodItem/restaurant/${this.props.restaurantId}`,
      });
      if (response.status === 200) {
        this.setState({
          isLoading: false,
          prevRestaurantId: this.props.restaurantId,
          foodItemList: response.data.foodItems,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  }
  async componentDidUpdate() {
    if (this.props.restaurantId !== this.state.prevRestaurantId) {
      try {
        const response = await axios({
          method: "GET",
          url: `/fd/foodItem/restaurant/${this.props.restaurantId}`,
        });
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            prevRestaurantId: this.props.restaurantId,
            foodItemList: response.data.foodItems,
          });
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }
  render() {
    const { isLoading, foodItemList } = this.state;
    if (isLoading) return <Loading height="100px" width="100%" />;
    return (
      <div className="food-item-list">
        <div className="food-item-list-header">
          <p>Menu</p>
          <div
            className="add-food-item-btn"
            onClick={() => {
              this.props.setCurrentRestaurant(this.props.restaurantId);
              this.props.toggleAddFoodWindow(true);
            }}
          >
            Add Food
          </div>
        </div>
        {foodItemList.map((item, idx) => (
          <FoodItem foodItem={item} />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddFoodWindow: (payload) => dispatch(toggleAddFoodWindow(payload)),
    setCurrentRestaurant: (payload) => dispatch(setCurrentRestaurant(payload)),
  };
};
export default connect(null, mapDispatchToProps)(FoodItemList);
