import React from "react";
import { connect } from "react-redux";
import { IoBanSharp } from "react-icons/io5";
import { withRouter } from "./../../withRouter";
import { CgSandClock } from "react-icons/cg";
import FoutZeroFour from "../../component/404/404.component";
import { toggleSignInWindow } from "../../redux/toggle/toggle.actions";
import {
  banRestaurant,
  toggleAccountActivity,
} from "../../redux/restaurant/restaurant.actions";
import "./admin.style.scss";
import axios from "axios";

// admin controls, remove / time-out a restaurant

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
    };
  }
  async componentDidMount() {
    try {
      // const response = await axios({
      //   method: "GET",
      //   url: "",
      // });
    } catch (err) {
      alert(err.message);
    }
  }
  render() {
    const { restaurant, user } = this.props;
    if (!user) {
      if (!this.props.isSignInWindowOpen) this.props.toggleSignInWindow(true);
      return <div className="blur-background"></div>;
    } else {
      if (user.role === "admin")
        return (
          <div className="admin-page">
            <div className="heading">
              <p>Restaurant List</p>
              <div
                className="res-appl"
                onClick={() => this.props.navigate("/admin/res-application")}
              >
                Restaurant Applications
              </div>
            </div>
            {!restaurant || !restaurant.length ? (
              <div className="empty-res">No restaurant found</div>
            ) : (
              this.props.restaurant.map((res) => (
                <div className="res-component">
                  <div
                    className="res-image"
                    style={{
                      backgroundImage: `url(${res.images[0]})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="res-details">
                    <div className="name common">{res.name}</div>
                    <div className="owner-name common ">{res.owner}</div>
                    <div className="owner-contact-number common">
                      {res.contact_number}
                    </div>
                    <div className="res-address common">{res.address}</div>
                  </div>
                  <div className="res-com-right">
                    <div className="active-status">
                      {res.isActive ? "Active" : "InActive"}
                    </div>
                    <span
                      onClick={() =>
                        this.props.toggleAccountActivity({
                          isActive: !res.isActive,
                          id: res._id,
                        })
                      }
                      title={
                        res.isActive
                          ? "inactive restaurant"
                          : "active Restaurant"
                      }
                    >
                      <CgSandClock />
                    </span>
                    <span
                      onClick={() =>
                        this.props.banRestaurant({
                          isBan: !res.isBan,
                          id: res._id,
                        })
                      }
                      title="ban restaurant"
                      className="ban"
                    >
                      <IoBanSharp />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      else return <FoutZeroFour />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    restaurant: state.restaurant.restaurantWithItems,
    user: state.user.user,
    isSignInWindowOpen: state.toggle.isSignInWindowOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleAccountActivity: (payload) =>
      dispatch(toggleAccountActivity(payload)),
    banRestaurant: (payload) => dispatch(banRestaurant(payload)),
    toggleSignInWindow: (payload) => dispatch(toggleSignInWindow(payload)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
