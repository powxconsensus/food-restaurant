import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DisplayCard from "../../component/display-card/display-card.component";
import "./home-page.style.scss";
import { Helmet } from "react-helmet";
import Loading from "./../../component/loading/loading.component";
import axios from "axios";
import { setRestaurantWithItem } from "./../../redux/restaurant/restaurant.actions";

// the home background and the color gradiant for the recommended restaurants

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      fourRes: [],
    };
  }
  async componentDidMount() {
    try {
      const response = await axios({
        method: "GET",
        url: "/fd/restaurant",
      });
      this.props.setRestaurantWithItem(response.data.recommendationRestaurant);
    } catch (err) {
      alert(err.message);
    }
  }
  setFourRes() {
    const { restaurant } = this.props;
    let n = 4 < restaurant.length ? 4 : restaurant.length;
    var result = new Array(n),
      len = restaurant.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = restaurant[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    this.setState({ fourRes: result });
  }

  render() {
    if (!this.props.restaurant || !this.props.restaurant.length)
      return (
        <>
          <Helmet>
            <title>{"Food For Foodie"}</title>
          </Helmet>
          <Loading height={"200px"} />
        </>
      );
    if (this.state.fourRes.length == 0) this.setFourRes();
    return (
      <>
        <Helmet>
          <title>{"Food For Foodie"}</title>
        </Helmet>
        <div className="home-page">
          <div className="recommended-restaurant">Recommended Restaurants</div>
          <div className="list-out-items">
            {this.state.fourRes.map((res) => (
              <Link to={`/restaurant/${res._id}`}>
                <DisplayCard kek={res._id} {...res} />
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurant: state.restaurant.restaurantWithItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRestaurantWithItem: (payload) =>
      dispatch(setRestaurantWithItem(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
