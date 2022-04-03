import "./profile.style.scss";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

// a profile page for storing the user address and details(requires a full backend to work)

const Profile = ({ user }) => {
  return (
    <>
      <Helmet>
        <title>{user ? user.firstName + " " + user.lastName : "Profile"}</title>
      </Helmet>
      <div className="profile">
        <div class="container mt-5 profilediv">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 ">
              <div className="card p-3 py-4">
                <div className="text-center profilediv">
                  <img
                    src="https://bit.ly/3f2vkes"
                    width="100"
                    className="rounded-circle"
                  />
                </div>
                <div className="text-center mt-3 profilediv">
                  <span className="bg-secondary p-1 px-4 rounded text-white">
                    Food Enthusiast
                  </span>
                  <h4 className="mt-2 mb-0">
                    {user ? user.firstName + " " + user.lastName : "No found"}
                  </h4>
                  <span>CEO and Co-Founder</span>
                  <div className="px-4 mt-1">
                    <p className="fonts">
                      Butter chicken with naan is my greatest weakness and
                      <br />
                      my favourite words are focus and now
                    </p>
                  </div>
                  <ul className="social-list">
                    <li>
                      <i className="fa fa-facebook"></i>
                    </li>
                    <li>
                      <i className="fa fa-dribbble"></i>
                    </li>
                    <li>
                      <i className="fa fa-instagram"></i>
                    </li>
                    <li>
                      <i className="fa fa-linkedin"></i>
                    </li>
                    <li>
                      <i className="fa fa-google"></i>
                    </li>
                  </ul>
                  <div className="buttons">
                    <button className="btn btn-outline-primary px-4">
                      Message
                    </button>
                    <button className="btn btn-primary px-4 ms-3">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(Profile);
