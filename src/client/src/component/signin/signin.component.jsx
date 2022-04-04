import React from "react";
import "./signin.style.scss";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/userReducer/user.actions";
import {
  toggleSignUpWindow,
  toggleSignInWindow,
} from "./../../redux/toggle/toggle.actions";

// page/popup card for signing in for a new user / login

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) return;
    axios({
      url: "/fd/users/signin",
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          this.props.setUser(res.data.user);
          this.setState({ email: "", password: "" });
          this.props.toggleSignInWindow(false);
        }
      })
      .catch((err) => alert("login failed, try again" + err.message));
    return;
  };
  render() {
    return (
      <div
        className="sign-in"
        onClick={(event) => {
          if (event.target.className === "sign-in")
            this.props.toggleSignInWindow(false);
        }}
      >
        <div className="sign-in-input-box">
          <div class="container">
            <div class="screen">
              <div class="screen__content">
                <h2>User Login</h2>
                <div class="login">
                  <div class="login__field">
                    <i class="login__icon fas fa-user"></i>
                    <input
                      type="email"
                      class="login__input"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="login__field">
                    <i class="login__icon fas fa-lock"></i>
                    <input
                      type="password"
                      name="password"
                      class="login__input"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    class="button login__submit"
                    onClick={this.handleSubmit}
                  >
                    <span class="button__text">Log In Now</span>
                    <i class="button__icon fas fa-chevron-right"></i>
                  </button>
                  <div className="signup-btn">
                    New to Here?{" "}
                    <h4 className="create-account" onClick={() => this.props.toggleSignUpWindow(true)}>
                      Create account
                    </h4>
                  </div>
                </div>
              </div>
              <div class="screen__background">
                <span class="screen__background__shape screen__background__shape4"></span>
                <span class="screen__background__shape screen__background__shape3"></span>
                <span class="screen__background__shape screen__background__shape2"></span>
                <span class="screen__background__shape screen__background__shape1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSignInWindow: (isOpen) => dispatch(toggleSignInWindow(isOpen)),
    toggleSignUpWindow: (isOpen) => dispatch(toggleSignUpWindow(isOpen)),
    setUser: (user) => dispatch(setUser(user)),
  };
};
export default connect(null, mapDispatchToProps)(SignIn);
