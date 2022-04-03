import React from "react";
import "./foodItem.style.scss";

class FoodItem extends React.Component {
  constructor() {
    super();
    this.state = {
      toExtend: false,
    };
  }
  c;
  render() {
    const { name } = this.props.foodItem;
    const { toExtend } = this.state;
    return (
      <div
        className="food-item"
        style={{
          paddingBottom: `${toExtend ? "0px" : ""}`,
        }}
        onClick={() => this.setState({ toExtend: !toExtend })}
      >
        {name}
        {toExtend ? <div className="extend-this-edit-option">Edit</div> : null}
      </div>
    );
  }
}

export default FoodItem;
