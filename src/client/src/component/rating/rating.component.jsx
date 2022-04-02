import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./rating.style.scss";

// It uses AiFillStar js function in order to render the rating starts from 1 to 5 using a map data structure. It works by taking the unfilled rating and subtracting from 5


const DisplayRating = ({ rating }) => {
  return (
    <div className="display-rating">
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
  );
};

export default DisplayRating;
