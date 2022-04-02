export const toggleSignInWindow = (isOpen) => {
  return {
    type: "TOGGLE_SIGNIN_WINDOW",
    payload: isOpen,
  };
};

export const toggleSignUpWindow = (isOpen) => {
  return {
    type: "TOGGLE_SIGNUP_WINDOW",
    payload: isOpen,
  };
};
