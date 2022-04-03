import "./display-card.style.scss";

// payment/login card ui

const DisplayCard = ({ name, images, _id }) => {
  let image = `http://localhost:4000/fd/public/restaurant/${_id}/images/${images[0]}`;
  if (images[0] === "defaultRes.png")
    image = `http://localhost:4000/fd/public/default/defaultRes.png`;
  return (
    <div className="display-card">
      <div
        className="display-card-images"
        style={{
          backgroundImage: `url(${image})`,
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
