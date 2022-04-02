import React from "react";
import "./foodItem.style.scss";

class FoodItem extends React.Component {
  constructor() {
    super();
    this.state = {
      toExtend: false,
    };
  }
  render() {
    const { foodItemId } = this.props;
    const { toExtend } = this.state;
    return (
      <div>
        <ul class="tilesWrap">
          <li>
            <h2>01</h2>
            <h3>Dish 1</h3>
            <p>
              Description of dish goes here.
            </p>
            <button>Delete</button>
          </li>
          <li>
            <h2>02</h2>
            <h3>Dish 2</h3>
            <p>
              You can add an image of the dish but I think this already looks good
            </p>
            <button>Delete</button>
          </li>
          <li>
            <h2>03</h2>
            <h3>Dish 3</h3>
            <p>
              A few Menus do not have pictures
            </p>
            <button>Delete</button>
          </li>
          <li>
            <h2>04</h2>
            <h3>Dish 4</h3>
            <p>
              Sample text
            </p>
            <button>Delete</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default FoodItem;
