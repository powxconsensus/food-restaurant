import React from "react";
import { connect } from "react-redux";
import SignIn from "../signin/signin.component";
import SignUp from "../signup/signup.component";
import AddFoodItem from "../../pages/manage-resturant-by-ID/add-food-item/add-food-item.component";
import { store } from "./../../redux/store";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/cart/cart.actions";
import axios from "axios";
import { withRouter } from "../../withRouter";
import "./header.style.scss";
import {
  toggleSignInWindow,
  toggleSignUpWindow,
} from "./../../redux/toggle/toggle.actions";
import { setUser } from "../../redux/userReducer/user.actions";
import { setRestaurantWithItem } from "../../redux/restaurant/restaurant.actions";
import CartItem from "../cart-item/cart-item.component";
import DisplayRating from "../rating/rating.component";
import { getRestaurantImageUrl } from "../../utils";

// Main webApp component file which renders all the things including the restaurants, restaurant
//  rating, restaurant images, the things without the login and with the login
// It also gets the restaurant items and includes them in the cart and calculates the total cost

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedRestaurant: [],
      isSearchedDropdownOpen: false,
      cartHidden: false,
    };
  }
  componentDidMount() {
    document.addEventListener("click", (event) => {
      const className = event.target.className;
      if (
        [
          // "searched-data-dropdown",
          "list-out",
          "list-item",
          "res-image",
          "res-details",
          "res-name",
          "rating",
          "search-input",
          "search",
        ].includes(className)
      ) {
        return;
      }
      this.setState({ isSearchedDropdownOpen: false });
    });
  }
  handleChange = async (event) => {
    const value = event.target.value;
    let tempRes = [];
    try {
      const response = await axios({
        method: "GET",
        url: `/fd/restaurant/searchItems?searchQuery=${value}`,
      });
      // console.log(response);
    } catch (err) {
      alert(err.message);
    }
    this.props.restaurantWithItems.map((res) => {
      if (res.name.toLowerCase().includes(value.toLowerCase()))
        return tempRes.push(res);
      // for (let i = 0; i < res.dishes.length; i++) {
      //   const dish = res.dishes[i];
      //   if (dish.name.toLowerCase().includes(value.toLowerCase())) {
      //     tempRes.push(res);
      //     break;
      //   }
      // }
    });
    // console.log(value);
    this.setState({ searchedRestaurant: tempRes });
  };
  handleSignOut = async (event) => {
    try {
      const response = await axios({
        method: "GET",
        url: "/fd/users/signout",
      });
      store.dispatch({
        type: "USER_LOGGED_OUT",
      });
      const pathName = this.props.location.pathname;
      if (pathName === "/carts" || pathName === "/checkout")
        this.props.navigate("/");
      window.location.reload(false);
    } catch (err) {
      alert(err.message);
    }
  };
  render() {
    const { isSearchedDropdownOpen } = this.state;
    return (
      <div
        className="header"
        style={{
          backgroundImage: `url("https://rb.gy/nnrzkz")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: `${this.props.location.pathname !== "/" ? "90px" : "60%"}`,
        }}
      >
        {this.props.isSignInOpen ? <SignIn /> : null}
        {this.props.isSignUpOpen ? <SignUp /> : null}
        {this.props.isAddFoodWindowOpen ? <AddFoodItem /> : null}
        <div className="overlayed-navbar">
          <div className="left-block-navbar">
            <div
              className="brand-name navbar-item "
              onClick={() => this.props.navigate("/")}
            >
              Food For Foodies
            </div>
          </div>
          <div className="right-block-navbar">
            <div
              className="navbar-item"
              onClick={() => {
                if (!this.props.user)
                  return this.props.toggleSignInWindow(true);
                this.props.navigate("/manage-restaurant");
              }}
            >
              {"Manage " + "Restaurant"}
            </div>
            {!this.props.user ? (
              <>
                <div
                  className="navbar-item"
                  onClick={() => this.props.toggleSignInWindow(true)}
                >
                  Login
                </div>
                <div
                  className="navbar-item"
                  onClick={() => this.props.toggleSignUpWindow(true)}
                >
                  Signup
                </div>
              </>
            ) : (
              <>
                <div
                  className="navbar-item"
                  onClick={(event) => {
                    if (event.target.className === "navbar-item")
                      this.setState({ cartHidden: !this.state.cartHidden });
                  }}
                  onDoubleClick={(event) => {
                    if (event.target.className === "navbar-item")
                      this.props.navigate("/carts");
                  }}
                >
                  Cart
                  {this.state.cartHidden ? (
                    <div className="cart-items">
                      <div className="namee">Cart Items</div>
                      <hr />
                      <div className="items">
                        {this.props.cartItems.map((item) => (
                          <CartItem item={item} />
                        ))}
                      </div>
                      <div className="total-cost">
                        <div>Total:</div>{" "}
                        <div>
                          {this.props.cartItems.reduce(
                            (prev, item) =>
                              prev + item.pricePerQuantity * item.quantity,
                            0
                          )}
                          {" Rs"}
                        </div>
                      </div>
                      <div
                        className="checkout"
                        onClick={() => {
                          this.setState({ cartHidden: false });
                          this.props.navigate("/checkout");
                        }}
                      >
                        Checkout
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="navbar-item" onClick={this.handleSignOut}>
                  Sign Out
                </div>
              </>
            )}
          </div>
          <div
            className="search-query-nav"
            style={{
              height: `${
                this.props.location.pathname !== "/" ? "120px" : "300px"
              }`,
            }}
          >
            <div className="search-input">
              <form
                autoComplete="off"
                style={{
                  width: `${this.props.location.pathname !== "/" ? "90%" : ""}`,
                }}
              >
                <input
                  type="text"
                  style={{
                    borderRadius: `${
                      isSearchedDropdownOpen ? "15px 15px 0px 0px" : "15px"
                    }`,
                  }}
                  id="search"
                  className="search"
                  name="search"
                  placeholder="Search by dishes or restaurants"
                  onChange={this.handleChange}
                  onClick={() =>
                    this.setState({ isSearchedDropdownOpen: true })
                  }
                />
              </form>
              {isSearchedDropdownOpen ? (
                <div
                  className="searched-data-dropdown"
                  style={{
                    width: `${
                      this.props.location.pathname !== "/" ? "72%" : ""
                    }`,
                  }}
                >
                  <hr />
                  {this.state.searchedRestaurant.map((res) => (
                    <>
                      <Link
                        to={`/restaurant/${res._id}`}
                        onClick={() =>
                          this.setState({ isSearchedDropdownOpen: false })
                        }
                        className="list-out"
                      >
                        <div className="list-item">
                          <div
                            className="res-image"
                            style={{
                              backgroundImage: `url(${getRestaurantImageUrl(
                                res.images[0],
                                res._id
                              )})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                          <div className="res-details">
                            <div className="res-name">{res.name}</div>
                            <div className="rating">
                              <DisplayRating rating={res.rating} />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <hr />
                    </>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isSignInOpen: state.toggle.isSignInWindowOpen,
    isSignUpOpen: state.toggle.isSignUpWindowOpen,
    user: state.user.user,
    restaurantWithItems: state.restaurant.restaurantWithItems,
    isAddFoodWindowOpen: state.toggle.isAddFoodWindowOpen,
    cartItems: state.cart.cartItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSignInWindow: (isOpen) => dispatch(toggleSignInWindow(isOpen)),
    toggleSignUpWindow: (isOpen) => dispatch(toggleSignUpWindow(isOpen)),
    setUser: (user) => dispatch(setUser(user)),
    setRestaurantWithItem: (payload) =>
      dispatch(setRestaurantWithItem(payload)),
    clearCart: () => dispatch(clearCart()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
