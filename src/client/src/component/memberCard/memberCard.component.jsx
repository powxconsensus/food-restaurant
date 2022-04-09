import { Link } from "react-router-dom";

import "./memberCard.style.scss";
import { BsInstagram, BsTwitter, BsLinkedin, BsFacebook } from "react-icons/bs";

// Here the team members are renders from the json database API with their details, it also includes an hover css annimation

const MemberCard = ({ name, image, rollNo, title, linkedin, instagram }) => {
  return (
    <div className="member-card">
      <div
        className="member-image"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="member-details-container">
        <div className="member-details">{name}</div>
        <div className="member-details">{rollNo}</div>
        <div className="member-details">{title}</div>
        <div className="contact-us">
          <Link to="#" className="contact-item">
            <BsTwitter />
          </Link>
          <a href={instagram} className="contact-item" target="_blank">
            <BsInstagram />
          </a>
          <a href={linkedin} className="contact-item" target="_blank">
            <BsLinkedin />
          </a>
          <Link to="#" className="contact-item">
            <BsFacebook />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MemberCard;
