import React from "react";
import axios from "axios";
import FoodItem from "./../FoodItem/foodItem.component";
import "./foodItemList.style.scss";
import Loading from "../../../component/loading/loading.component";

class FoodItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      foodItemList: [],
      prevRestaurantId: "",
      isLoading: true,
    };
  }
  async componentDidMount() {
    if (!this.props.restaurantId) return;
    try {
      const response = await axios({
        method: "GET",
        url: `/fd/foodItem/restaurant/${this.props.restaurantId}`,
      });
      if (response.status == 200) {
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
    if (this.props.restaurantId != this.state.prevRestaurantId) {
      try {
        const response = await axios({
          method: "GET",
          url: `/fd/foodItem/restaurant/${this.props.restaurantId}`,
        });
        if (response.status == 200) {
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
          <div className="add-food-item-btn">Add Food</div>
        </div>
        {foodItemList.map((item, idx) => (
          <FoodItem foodItem={item} />
        ))}
      </div>
    );
  }
}

export default FoodItemList;
