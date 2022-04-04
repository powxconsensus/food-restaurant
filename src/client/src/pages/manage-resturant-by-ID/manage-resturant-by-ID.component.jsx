import React from "react";
import axios from "axios";
import "./manage-resturant-by-ID.style.scss";
import FoodItemList from "./foodItemList/foodItemList.component";
import { withRouter } from "../../withRouter";
import Loading from "../../component/loading/loading.component";
import SlideShow from "../../component/slideshow/slideshow.component";

class ManageRestaurantById extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      prevRestaurantId: "",
      isLoading: true,
      // image:""
    };
  }
  async componentDidMount() {
    try {
      const { restaurantId } = this.props.params;
      const response = await axios({
        method: "GET",
        url: `/fd/restaurant/${restaurantId}`,
      });
      if (response.status === 200) {
        this.setState({
          prevRestaurantId: restaurantId,
          restaurant: response.data.restaurant,
          isLoading: false,
        });
      }
    } catch (err) {
      alert(err.message);
    }
  }
  componentDidUpdate() {
    if (this.state.prevRestaurantId !== this.props.params.restaurantId) {
    }
  }
  handleSubmit = async (event) => {
    const image = event.target
      .closest("#upload-restaurant-Image")
      .querySelector("#res-img-input").files[0];
    if (!image) return alert("upload image first!");
    const formData = new FormData();
    formData.append("images", image);
    try {
      const response = await axios({
        method: "PATCH",
        url: `/fd/restaurant/${this.state.prevRestaurantId}`,
        data: formData,
      });
      alert("image uploaded successfully");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  render() {
    const { restaurant, isLoading } = this.state;
    if (isLoading) return <Loading />;
    const { images, description, contactNo, openCloseStatus, address, _id } =
      restaurant;
    let len = images.length - 1;
    let image = `http://localhost:4000/fd/public/restaurant/${_id}/images/${images[len]}`;
    if (images[len] === "defaultRes.png")
      image = `http://localhost:4000/fd/public/default/defaultRes.png`;

    return (
      <div className="manage-restaurant-ById">
        <div className="restaurant-name">{restaurant.name}</div>
        <div className="restraunt-info">
          <div className="imgdiv">
            <SlideShow items={images} _id={_id} />
          </div>
          <div className="describe-restaurant-data">
            <div className="res-desc">
              <b>Description: </b>
              {description} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Totam amet quae soluta architecto voluptates.
            </div>
            <div className="res-desc">
              <b>Contact Number: </b>
              {contactNo}
            </div>
            <div className="res-desc">
              <b>Open/Close: </b>
              {openCloseStatus ? "Open" : "Close"}
            </div>
            <div className="res-desc">
              <b>Address: </b>
              {address}
            </div>
            <form id="upload-restaurant-Image">
              <label htmlFor="image">Upload Restaurant Image</label>
              <div className="inline-flex">
                <input
                  type="file"
                  name="image"
                  id="res-img-input"
                  // onChange={(event) =>
                  //   this.setState({ image: event.target.files[0] })
                  // }
                />
                <div className="upload-img" onClick={this.handleSubmit}>
                  Upload
                </div>
              </div>
            </form>
          </div>
        </div>

        <FoodItemList restaurantId={this.state.prevRestaurantId} />
      </div>
    );
  }
}

export default withRouter(ManageRestaurantById);
