import { getRestaurantImageUrl } from "../../utils";
import "./display-card.style.scss";

// payment/login card ui

const DisplayCard = ({ name, images, _id }) => {
  return (
    <div className="display-card">
      <div
        className="display-card-images"
        style={{
          backgroundImage: `url(${getRestaurantImageUrl(images[0], _id)})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <hr />
      <div className="card-display-name">{name}</div>
    </div>
  );
};

export default DisplayCard;
