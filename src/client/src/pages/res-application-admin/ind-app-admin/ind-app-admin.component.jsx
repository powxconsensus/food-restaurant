import "./ind-app-admin.style.scss";

const IndApplication = ({ name }) => {
  return (
    <div className="ind-app">
      <div className="restaurant-desc">{name}</div>
      <div className="status-btn">
        <div className="btn">Reject</div>
        <div className="btn">Accept</div>
      </div>
    </div>
  );
};

export default IndApplication;
