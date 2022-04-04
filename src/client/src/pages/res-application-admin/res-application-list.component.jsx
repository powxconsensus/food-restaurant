import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Loading from "./../../component/loading/loading.component";
import FoutZeroFour from "../../component/404/404.component";
import "./res-application-list.style.scss";
import IndApplication from "./ind-app-admin/ind-app-admin.component";

class RestaurantApplicationList extends React.Component {
  constructor() {
    super();
    this.state = {
      resList: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    try {
      const response = await axios({
        method: "GET",
        url: "/fd/restaurant/admin",
      });
      this.setState({ resList: response.data.restaurants });
    } catch (err) {
      alert(err.message);
    }
  }
  render() {
    const { user, isLoading } = this.props;
    if (isLoading) return <Loading />;
    if (user.role !== "admin") return <FoutZeroFour />;
    return (
      <div className="res-appl-admin">
        <div className="heading">Accept or Reject Application</div>
        {this.state.resList.map((res) => (
          <IndApplication key={res._id} {...res} />
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

export default connect(mapStateToProps)(RestaurantApplicationList);
