import React from "react";
import "./loading.style.scss";

const Loading = ({ height, width }) => {
  return (
    <div
      className="content-loading"
      style={{ height: `${height}`, width: `${width}` }}
    >
      Loading
    </div>
  );
};

export default Loading;
