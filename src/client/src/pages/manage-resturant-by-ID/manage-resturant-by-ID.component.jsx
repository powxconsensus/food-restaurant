import React from "react";
import "./manage-resturant-by-ID.style.scss";
import FoodItem from "./FoodItem/foodItem.component";

class ManageRestaurantById extends React.Component {
  constructor() {
    super();
    this.state = {
      foodItemList: ["1"],
    };
  }
  render() {
    const { foodItemList } = this.state;
    return (
      <div className="manage-restaurant-ById">
        <div className="restaurant-name">Restaurant name</div>

        <div className="restraunt-info">
          <div className="imgdiv">Add image from backend here</div>

          <div className="describe-restaurant-data">
            describe-restaurant-data [load from backend]
          </div>
        </div>

        <div className="food-item-list">
          <div className="food-item-list-header">Menu</div>
          {foodItemList.map((item, idx) => (
            <FoodItem foodItemId={idx} />
          ))}
        </div>
        <div className="add-food-item-btn">Add Food</div>
      </div>
    );
  }
}

export default ManageRestaurantById;
