import React from "react";
import { connect } from "react-redux";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import DisplayRating from "./../../../component/rating/rating.component";
import "./review.style.scss";
import { addRestaurantReview } from "../../../redux/restaurant/restaurant.actions";

class Review extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 4,
      text: "",
      email: "",
      city: "",
      name: "",
    };
  }
  handleStarClick = (event) => {
    this.setState({
      rating:
        parseInt(event.target.closest(".star-btn").getAttribute("id")) + 1,
    });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    const { rating, email, text, city, name } = this.state;
    const { user } = this.props;
    if (user) {
      if (!text) return;
      this.props.addRestaurantReview({
        restaurant_id: this.props.restaurant_id,
        rating,
        text,
        name: user.email.substring(0, user.email.lastIndexOf("@")),
      });
    } else {
      if (!text || !city || !email || !name) return;
      this.props.addRestaurantReview({
        restaurant_id: this.props.restaurant_id,
        rating,
        text,
        name,
        city,
        email,
      });
    }
    this.setState({ rating: 3, email: "", name: "", city: "", text: "" });
  };
  render() {
    const { restaurant, user } = this.props;
    const review = restaurant
      ? restaurant.map((res) => {
          if (res.id === this.props.restaurant_id) return res.review;
        })[0]
      : null;
    return (
      <div className="people-review-list">
        <div className="review-head">Reviews</div>
        <hr />

        {review && review.length ? (
          <div className="review-list">
            {review.map((rev) => (
              <>
                <div className="review-item">
                  <hr />
                  <div className="rating-given">
                    <DisplayRating rating={rev.rating} />
                  </div>
                  <div className="review-text">{rev.text}</div>
                  <div className="written-by">- {rev.name}</div>
                </div>
              </>
            ))}
            <hr />
          </div>
        ) : (
          <div className="empty-message">no review found, post it</div>
        )}
        <div className="review-head">Write Your Review</div>
        <hr />
        <div className="review-form-container">
          <div className="review-form">
            <div className="rating-btn">
              {[...Array(this.state.rating)].map((el, idx) => (
                <span
                  id={idx}
                  className="filled star-btn"
                  onClick={this.handleStarClick}
                >
                  <AiFillStar />
                </span>
              ))}
              {[...Array(5 - this.state.rating)].map((el, idx) => (
                <span
                  id={this.state.rating + idx}
                  className="empty star-btn"
                  onClick={this.handleStarClick}
                >
                  <AiOutlineStar />
                </span>
              ))}
            </div>
            <div className="feedback-textarea">
              <label for="res-review">Review of restaurant:</label>
              <textarea
                id="res-review"
                name="text"
                placeholder="Your review here..."
                onChange={this.handleChange}
                value={this.state.text}
              >
                ff
              </textarea>
              {!user ? (
                <div className="your-info">
                  <h2>Your Info</h2>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    className="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <div className="submit-btn">
                    <span onClick={this.handleSubmit}>Submit</span>
                  </div>
                  <div className="review-policy">
                    By clicking Submit, I authorize the sharing of my name and
                    review on the web. (email will not be shared)
                  </div>
                </div>
              ) : (
                <div className="submit-btn">
                  <span onClick={this.handleSubmit}>Submit</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    restaurant: state.restaurant.restaurantWithItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addRestaurantReview: (review) => dispatch(addRestaurantReview(review)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
