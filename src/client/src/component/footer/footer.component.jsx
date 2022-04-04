import { Link } from "react-router-dom";
import "./footer.style.scss";

const Footer = () => {
  return (
    <footer>
      <div class="top_header">
        <section>
          <span>
            <i class="fa fa-map-marker"></i>
          </span>
          <span class="ho-address">Tada, Sri city, AP, India, 234444</span>
        </section>
        <section>
          <span>
            <i class="fa fa-phone"></i>
          </span>
          <span>(+91) 9453123444 </span>
        </section>
        <section>
          <span>
            <i class="fa fa-envelope"></i>
          </span>
          <span>food.delivery@gmail.com</span>
        </section>
      </div>
      <span class="border-shape"></span>
      <div class="bottom_content">
        <section>
          <ul class="socials">
            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
            <li><a href="#"><i class="fa fa-youtube"></i></a></li>
            <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
          </ul>
        </section>
        <section className="bottom_navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About us</Link>
          <Link to="/delivery">Delivery</Link>
          <Link to="/covid">CovidMeasures </Link>
          <Link to="/members">Member</Link>
          <Link to="/contactus">Contact Us</Link>
        </section>
      </div>
      <div class="copyright">
        Copyright © 2021 Food delivery - All rights reserved
      </div>
    </footer>
  );
};
export default Footer;
