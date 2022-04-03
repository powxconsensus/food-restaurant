import React from "react";
import { connect } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import "./cart-item.style.scss";
import {
  addToCart,
  removeFromCart,
  clearItemFromCart,
} from "../../redux/cart/cart.actions";

/*  This section contains cart-item section code

   We used a class called Cartitem for rendering the cart part in UI
   The code is embeded in a class to perform three operations like
   1.Adding an item in cart
   2.Changing the quantity of items in the cart
   3.Removing the item from the cart
*/

class CartItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { item, itemHeight, itemImageWidth, textFontSize, isItCartPage } =
      this.props;
    return (
      <div className="cart-item" style={{ height: `${itemHeight}` }}>
        <img
          src={item.image}
          alt=""
          className="item-image"
          style={{ width: `${itemImageWidth}` }}
        />
        <div className="item-name" style={{ fontSize: `${textFontSize}` }}>
          {item.name}
        </div>
        <div className="right-side-cart-items">
          {isItCartPage ? (
            <div className="quantity-x-price">
              <div>
                {item.quantity}
                {" x"}
                {item.pricePerQuantity}
                {" Rs"}
              </div>
            </div>
          ) : null}
          <div
            className="clear-mark"
            onClick={() => this.props.clearItemFromCart(item)}
          >
            <IoClose />
          </div>
          <div className="add-remove">
            <IoMdArrowDropup
              style={{ fontSize: `${textFontSize}` }}
              onClick={() => this.props.addToCart(item)}
            />
            <IoMdArrowDropdown
              style={{ fontSize: `${textFontSize}` }}
              onClick={() => this.props.removeFromCart(item)}
            />
          </div>
          <div className="item-price" style={{ fontSize: `${textFontSize}` }}>
            {item.pricePerQuantity * item.quantity} Rs
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  };
};
export default connect(null, mapDispatchToProps)(CartItem);
