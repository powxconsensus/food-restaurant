import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "../../withRouter";
import CartItem from "./../../component/cart-item/cart-item.component";
import { toggleSignInWindow } from "../../redux/toggle/toggle.actions";
import "./cart.style.scss";

// page and a popup for the items cart and stores the food to be ordered

class Cart extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    try {
      const response = await axios({
        method: "GET",
        url: "/fd/cart/",
      });
      const userCart = response.data.userCart.cartItems;
      console.log(userCart);
    } catch (err) {
      alert(err.message);
    }
  }
  render() {
    if (!this.props.user) {
      if (!this.props.isSignInWindowOpen) this.props.toggleSignInWindow(true);
      return <div className="blur-background"></div>;
    } else
      return (
        <>
          <Helmet>
            <title>{"Cart"}</title>
          </Helmet>
          <div className="cart-page">
            <div className="name-row">Cart</div>
            <hr />
            {this.props.cartItems.length ? (
              <div className="cart-items-pages">
                {this.props.cartItems.map((item) => (
                  <>
                    <CartItem
                      item={item}
                      itemHeight="200px"
                      itemImageWidth="200px"
                      textFontSize="36px"
                      isItCartPage="true"
                    />
                    <hr />
                  </>
                ))}
                <div className="checkout-btn">
                  <div className="total-cost">
                    Total cost:{" "}
                    {this.props.cartItems.reduce(
                      (prev, item) =>
                        prev + item.pricePerQuantity * item.quantity,
                      0
                    )}{" "}
                    Rs
                  </div>
                  <div
                    className="ch"
                    onClick={() => this.props.navigate("/checkout")}
                  >
                    CheckOut
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-cart">Your cart is empty!</div>
            )}
          </div>
        </>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    cartItems: state.cart.cartItems,
    isSignInWindowOpen: state.toggle.isSignInWindowOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSignInWindow: (payload) => dispatch(toggleSignInWindow(payload)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
