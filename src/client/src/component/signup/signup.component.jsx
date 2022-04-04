import React from "react";
import "./signup.style.scss";
import { connect } from "react-redux";
import axios from "axios";
import {
  toggleSignUpWindow,
  toggleSignInWindow,
} from "./../../redux/toggle/toggle.actions";
import { setUser } from "../../redux/userReducer/user.actions";
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    };
  }
  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      passwordConfirm,
      phoneNumber,
    } = this.state;
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !passwordConfirm ||
      !phoneNumber
    )
      return;
    try {
      const response = await axios({
        method: "POST",
        url: "/fd/users/signUp",
        data: {
          email,
          password,
          firstName,
          lastName,
          passwordConfirm,
          phoneNumber,
        },
      });
      this.props.setUser(response.data.user);
      this.props.toggleSignInWindow(false);
    } catch (err) {
      alert(err.message);
    }
  };
  render() {
    return (
      <div
        className="sign-up"
        onClick={(event) => {
          if (event.target.className === "sign-up")
            this.props.toggleSignUpWindow(false);
        }}
      >
        <div className="sign-in-input-box">
          <div class="container">
            <div class="screen">
              <div class="screen__content">
                <h2>New User Signup</h2>
                <form class="login">
                  <div class="login__field">
                    <i class="login__icon fas fa-lock"></i>
                    <input
                      type="text"
                      name="firstName"
                      class="login__input"
                      placeholder="First Name"
                      value={this.state.firstName}
                      onChange={this.onChange}
                    />
                    <input
                      type="text"
                      name="Last Name"
                      class="login__input"
                      placeholder="last Name"
                      value={this.state.lastName}
                      onChange={this.onChange}
                    />
                  </div>
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
                  <div class="login__field">
                    <i class="login__icon fas fa-lock"></i>
                    <input
                      type="password"
                      name="passwordConfirm"
                      class="login__input"
                      placeholder="Confirm password"
                      value={this.state.passwordConfirm}
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="login__field">
                    <i class="login__icon fas fa-lock"></i>
                    <input
                      type="text"
                      name="phoneNumber"
                      class="login__input"
                      placeholder="Phone Number"
                      value={this.state.phoneNumber}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    class="button login__submit"
                    onClick={this.handleSubmit}
                  >
                    <span class="button__text">Sign up Now</span>
                    <i class="button__icon fas fa-chevron-right"></i>
                  </button>
                  <div className="signup-btn">
                    Have an account?{" "}
                    <h4
                      onClick={() => {
                        this.props.toggleSignInWindow(true);
                      }}
                    >
                      Login
                    </h4>
                  </div>
                </form>
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
    toggleSignUpWindow: (isOpen) => dispatch(toggleSignUpWindow(isOpen)),
    toggleSignInWindow: (isOpen) => dispatch(toggleSignInWindow(isOpen)),
    setUser: (user) => dispatch(setUser(user)),
  };
};
export default connect(null, mapDispatchToProps)(SignUp);
