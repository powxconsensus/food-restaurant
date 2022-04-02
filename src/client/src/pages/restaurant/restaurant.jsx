import React from "react";
import { connect } from "react-redux";
import FoutZeroFour from "../../component/404/404.component";
import { withRouter } from "../../withRouter";
import Order from "./order/order.component";
import "./restaurant.style.scss";
import Review from "./review/review.component";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Helmet } from "react-helmet";
import axios from "axios";

// the review component for the restaurant page. works differently for logged in and not logged in people
// it shows the already stored reviews and also askes the user for more restaurant reviews and stores them including the ratings

class Restaurant extends React.Component {
  constructor() {
    super();
    this.state = {
      isOrder: true,
      isReview: false,
      restaurant: null,
      notFound: false,
      lastResId: "",
    };
  }
  async componentDidMount() {
    const response = await axios({
      method: "GET",
      url: `/fd/restaurant/${this.props.params.id}`,
    });
    if (response.status == 200) {
      this.setState({
        restaurant: response.data.restaurant,
        lastResId: this.props.params.id,
      });
    } else {
      return this.setState({
        notFound: true,
        lastResId: this.props.params.id,
      });
    }
    this.setState({ lastResId: this.props.params.id });
  }
  async componentDidUpdate() {
    if (this.state.lastResId != this.props.params.id) {
      const response = await axios({
        method: "GET",
        url: `/fd/restaurant/${this.props.params.id}`,
      });
      if (response.status == 200) {
        this.setState({
          restaurant: response.data.restaurant,
          lastResId: this.props.params.id,
        });
      } else {
        return this.setState({
          notFound: true,
          lastResId: this.props.params.id,
        });
      }
      this.setState({ lastResId: this.props.params.id });
    }
  }
  render() {
    if (this.state.notFound)
      return (
        <div className="restaurant-not-found">
          <FoutZeroFour />
        </div>
      );
    if (!this.state.restaurant) return <div>Loading...</div>;
    const { isOrder, isReview, restaurant } = this.state;
    const { name, rating, images } = restaurant;
    return (
      <>
        <Helmet>
          <title>{name}</title>
        </Helmet>
        <div className="restaturant-page">
          <div className="res-images">
            <img
              className="res-image-item0"
              src={images[0]}
              alt="images not found"
            />
            <img
              className="res-image-item1"
              src={images[1]}
              alt="images not found"
            />
            <img
              className="res-image-item2"
              src={images[2]}
              alt="images not found"
            />
            <img
              className="res-image-item3"
              src={images[3]}
              alt="images not found"
            />
            <img
              className="res-image-item4"
              src={images[4]}
              alt="images not found"
            />
            <div className="res-details">
              <div className="res-name"> {name}</div>
              <div className="res-rating">
                {[...Array(parseInt(rating))].map((el, idx) => (
                  <span className="filled">
                    <AiFillStar />
                  </span>
                ))}
                {[...Array(5 - parseInt(rating))].map((el, idx) => (
                  <span className="empty">
                    <AiOutlineStar />
                  </span>
                ))}
              </div>
            </div>
            <div className="res-address">Sricity, India</div>
          </div>
          <hr />
          <div className="navbar-list">
            <div
              className={isOrder ? "nav-item active" : "nav-item"}
              onClick={() => this.setState({ isOrder: true, isReview: false })}
            >
              Order
            </div>
            <div
              className={isReview ? "nav-item active" : "nav-item"}
              onClick={() => this.setState({ isOrder: false, isReview: true })}
            >
              Review
            </div>
          </div>
          <hr />
          {this.state.isOrder ? (
            <Order restaurant_id={this.state.restaurant._id} />
          ) : null}
          {this.state.isReview ? (
            <Review restaurant_id={this.state.restaurant._id} />
          ) : null}
        </div>
      </>
    );
  }
}
const mapPropsToState = (state) => {
  return {
    restaurant: state.restaurant.restaurantWithItems,
  };
};
export default connect(mapPropsToState)(withRouter(Restaurant));
