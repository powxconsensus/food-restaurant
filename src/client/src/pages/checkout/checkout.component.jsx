import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import "./checkout.style.scss";
import displayRazorpay from "../../component/displayRazorpay/displayRazorpay.component";
import { clearCart } from "../../redux/cart/cart.actions";
import { toggleSignInWindow } from "../../redux/toggle/toggle.actions";
import { withRouter } from "../../withRouter";
import CartItem from "../../component/cart-item/cart-item.component";
import { BiCircle } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

// checkout and payment page which gets the address and the final payable amount

class CheckOut extends React.Component {
  constructor() {
    super();
    this.state = {
      addingAddress: false,
      selectedAddress: 1,
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      addressName: "",

      address: [
        {
          addressName: "Hostel",
          street: "prag narain road",
          city: "Lucknow",
          state: "UP",
          country: "India",
          zip: "2789123",
          id: 1,
        },
      ],
    };
  }
  addAddress = () => {
    const { street, city, state, country, zip, addressName } = this.state;
    if (!street || !city || !state || !country || !zip)
      return alert("Enter full addres details");
    this.setState({
      address: [
        ...this.state.address,
        {
          street,
          city,
          state,
          country,
          zip,
          addressName,
          id: this.state.address.length + 1,
        },
      ],
      addingAddress: false,
    });
  };
  componentDidMount() {
    var placeSearch, autocomplete;
    // List all address components (corresponds to form field IDs and Google address object)
    var componentForm = {
      autocomplete: ["street_number", "route"],
      inputCity: "locality",
      inputState: "administrative_area_level_1",
      inputZip: "postal_code",
      inputCounty: "administrative_area_level_2",
      inputCountry: "country",
    };
    // Create autocomplete object based on the autocomplete ("street") field
    // Location type restricted to geocode
    function initAutocomplete() {
      autocomplete = new window.google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
          document.getElementById("autocomplete")
        ),
        { type: ["geocode"] }
      ); // Call fillInAddress when user selects an address from dropdown

      autocomplete.addListener("place_changed", fillInAddress);
    }
    // Fill fields with values from Google Maps autocomplete object
    function fillInAddress() {
      // Get place data from autocomplete object
      var place = autocomplete.getPlace();
      console.log(place);
      // Enable each field, then fill them with the corresponding value from the place object
      for (var component in componentForm) {
        document.getElementById(component).disabled = false;
        document.getElementById(component).value = search(
          componentForm[component],
          place.address_components
        );
      }
      // Fill the autocomplete field with values from the place object
      // If a street number is not found, set the field to route only.
      if (search("street_number", place.address_components) != "") {
        document.getElementById("autocomplete").value =
          search("street_number", place.address_components) + " ";
      }
      document.getElementById("autocomplete").value += search(
        "route",
        place.address_components
      );
      // Search the passed object for a specified address component/type and return the short_name value of the matched component/type
      // If requested type does not exist in the placeObject, return an empty string
      function search(type, placeObject) {
        for (var i = 0; i < placeObject.length; i++) {
          if (placeObject[i].types[0] === type) {
            return placeObject[i].short_name;
          } else if (i === placeObject.length - 1) {
            return "";
          }
        }
      }
    }
  }
  handlePayment = () => {
    displayRazorpay({
      user: this.props.user,
      totalAmount: this.props.cartItems.reduce(
        (prev, item) => prev + item.pricePerQuantity * item.quantity,
        0
      ),
      cartItems: this.props.cartItems,
      navigate: this.props.navigate,
      clearCart: this.props.clearCart,
    });
  };
  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { address, selectedAddress } = this.state;
    if (!this.props.user) {
      if (!this.props.isSignInWindowOpen) this.props.toggleSignInWindow(true);
      return <div className="blur-background"></div>;
    } else {
      if (this.props.cartItems.length)
        return (
          <>
            <Helmet>
              <title>{"CheckOut"}</title>
            </Helmet>
            <div className="checkout-page">
              <div className="checkout">CheckOut</div>
              <div className="checkout-checkout-below">
                <div className="left-co">
                  <div className="delivery-address">Delivery Address</div>
                  <div className="pre-address-list">
                    {address && address.length ? (
                      address.map((add) => (
                        <>
                          <div
                            className="address"
                            onClick={() =>
                              this.setState({ selectedAddress: add.id })
                            }
                          >
                            <div className="selected-icon">
                              {selectedAddress && selectedAddress == add.id ? (
                                <FaCheckCircle id="blue-rahega" />
                              ) : (
                                <BiCircle id="white-rahega" />
                              )}
                            </div>
                            <div className="inner-element">
                              <div className="address-name">
                                {add.addressName}
                              </div>
                              <div className="full-address">
                                {add.street +
                                  ", " +
                                  add.zip +
                                  ", " +
                                  add.city +
                                  ", " +
                                  add.country}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      ))
                    ) : (
                      <div className="no-address">
                        Please add address for food delivery
                      </div>
                    )}
                    <div
                      className="add-address"
                      onClick={() => this.setState({ addingAddress: true })}
                    >
                      Add Address
                    </div>
                  </div>
                </div>
                <div className="right-co">
                  <div className="cart-items">
                    <div className="summary">Summary</div>
                    <div className="ordering-item">Ordering Items</div>
                    {this.props.cartItems.map((item) => (
                      <CartItem item={item} />
                    ))}
                    <div className="total-amount">
                      <span>Total Amount: </span>
                      <span>
                        {this.props.cartItems.reduce(
                          (prev, item) =>
                            prev + item.pricePerQuantity * item.quantity,
                          0
                        )}
                        {" Rs"}
                      </span>
                    </div>
                  </div>
                  <div className="payment" onClick={this.handlePayment}>
                    Payment
                  </div>
                </div>
              </div>
            </div>
            {this.state.addingAddress ? (
              <div
                className="add-address-model"
                onClick={(event) => {
                  if (event.target.className == "add-address-model")
                    this.setState({ addingAddress: false });
                }}
              >
                <div className="add-window">
                  <div className="window-heading">Add Address</div>
                  <div class="form-group">
                    <input
                      type="street"
                      name="street"
                      class="form-control"
                      id="autocomplete"
                      placeholder="Street"
                      value={this.state.street}
                      onChange={this.onChange}
                    />

                    <input
                      type="city"
                      name="city"
                      class="form-control"
                      id="inputCity"
                      placeholder="City"
                      value={this.state.city}
                      onChange={this.onChange}
                    />

                    <input
                      type="state"
                      name="state"
                      class="form-control"
                      id="inputState"
                      placeholder="State"
                      value={this.state.state}
                      onChange={this.onChange}
                    />

                    <input
                      name="zip"
                      type="zip"
                      class="form-control"
                      id="inputZip"
                      placeholder="Zip"
                      value={this.state.zip}
                      onChange={this.onChange}
                    />

                    <input
                      type="country"
                      name="country"
                      class="form-control"
                      id="inputCounty"
                      placeholder="County"
                      value={this.state.country}
                      onChange={this.onChange}
                    />
                    <input
                      type="addressName"
                      name="addressName"
                      class="form-control"
                      id="addressName"
                      placeholder="Home"
                      value={this.state.addressName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="submit-btn">
                    <span onClick={this.addAddress}>Confirm And Add</span>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        );
      else {
        this.props.navigate("/carts");
        return <div>no items to checkout</div>;
      }
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    cartItems: state.cart.cartItems,
  };
};
const mapStateToDispatch = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
    toggleSignInWindow: (payload) => dispatch(toggleSignInWindow(payload)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapStateToDispatch)(CheckOut)
);
