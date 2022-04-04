import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/cart/cart.actions";
import { toggleSignInWindow } from "../../../redux/toggle/toggle.actions";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./order.style.scss";
import axios from "axios";
import { getFoodItemImageUrl } from "../../../utils";

// it renders the food dishes from the db.json file which uses a mick json API and
// it also caontains the AiFillStar function to get the restaurant star reviews

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      foodItems: [],
    };
  }
  async componentDidMount() {
    const response = await axios({
      method: "GET",
      url: `/fd/foodItem/restaurant/${this.props.restaurant_id}`,
    });
    if (response.status == 200) {
      this.setState({ foodItems: response.data.foodItems });
    }
  }
  handleAddToCart = async (order) => {
    const { user } = this.props;
    if (!user) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      toggleSignInWindow(true);
    } else {
      console.log({
        foodItemId: order._id,
        quantity: 1,
      });
      try {
        // const response = await axios({
        //   method: "PATCH",
        //   url: "/fd/cart",
        //   data: {
        //     foodItemId: order._id,
        //     quantity: 1,
        //   },
        // });

        this.props.addToCart(order);
      } catch (err) {
        alert(err.message);
      }
    }
  };
  render() {
    const { user, toggleSignInWindow } = this.props;
    const { foodItems } = this.state;
    return (
      <div className="order-list">
        {foodItems.map((order) => (
          <>
            <div className="dish-item">
              <div className="dish-image">
                <img src={getFoodItemImageUrl(order.images[0])} alt="" />
              </div>
              <div className="dish-details">
                <div className="name-rating">
                  <div className="dish-name">{order.name}</div>
                  <div className="dish-rating">
                    {[...Array(parseInt(order.rating))].map((el, idx) => (
                      <span className="filled">
                        <AiFillStar />
                      </span>
                    ))}
                    {[...Array(5 - parseInt(order.rating))].map((el, idx) => (
                      <span className="empty">
                        <AiOutlineStar />
                      </span>
                    ))}
                  </div>
                  <div className="dish-cost">
                    {order.pricePerQuantity}
                    {" Rs"}
                  </div>
                </div>
                <div className="add-to-cart">
                  <div
                    onClick={async (event) => await this.handleAddToCart(order)}
                    style={{
                      opacity: `${user ? 1 : 0.8}`,
                    }}
                  >
                    Add +
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    toggleSignInWindow: (isOpen) => dispatch(toggleSignInWindow(isOpen)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
