import React from "react";
import "./signup.style.scss";
import { connect } from "react-redux";
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
    this.props.setUser({
      email: email,
      password,
    });
    this.setState({ email: "", password: "" });
    this.props.toggleSignInWindow(false);
  };
  render() {
    return (
      <div
        className="sign-in"
        onClick={(event) => {
          if (event.target.className === "sign-in")
            this.props.toggleSignUpWindow(false);
        }}
      >
        <div className="sign-in-input-box">
          <div class="container">
            <div class="screen">
              <div class="screen__content">
                <form class="login">
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
