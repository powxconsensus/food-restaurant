import React from "react";
import Loading from "../loading/loading.component";

import "./slideshow.style.scss";

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      idx: 0,
      nextIdx: 0,
      isLoading: true,
      interval: "",
      move: false,
    };
  }
  setIndexes(idx) {
    this.setState({
      idx: idx,
      nextIdx: this.getNextIndex(idx),
    });
  }
  getNextIndex(idx) {
    return (idx + 1) % this.props.items.length;
  }

  componentDidMount() {
    this.setState({ items: this.props.items, isLoading: false });

    let interval = setInterval(() => {
      // on
      this.setState({
        move: true,
      });
      // off
      setTimeout(() => {
        this.setState({
          move: false,
        });
        this.setIndexes(this.getNextIndex(this.state.idx));
      }, 500); // same delay as in the css transition here
    }, 2000);
    this.setState({ interval });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    const { items, idx, isLoading, move, nextIdx } = this.state;
    if (isLoading) return <Loading />;
    let image = `http://localhost:4000/fd/public/restaurant/${this.props._id}/images/${items[idx]}`;
    if (items[idx] === "defaultRes.png")
      image = `http://localhost:4000/fd/public/default/defaultRes.png`;
    let nextImage = `http://localhost:4000/fd/public/restaurant/${this.props._id}/images/${items[nextIdx]}`;
    if (items[nextIdx] === "defaultRes.png")
      nextImage = `http://localhost:4000/fd/public/default/defaultRes.png`;
    return (
      <div className="slide-show-box">
        <div className="pic-wrapper">
          <div className={`current pic ${move}`}>
            <img src={image} alt="" />
          </div>
          <div className={`next pic ${move}`}>
            <img src={nextImage} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default SlideShow;
