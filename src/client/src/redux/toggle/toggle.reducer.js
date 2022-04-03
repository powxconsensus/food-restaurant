const INITIAL_STATE = {
  isSignInWindowOpen: false,
  isSignUpWindowOpen: false,
  isAddFoodWindowOpen: false,
};

const toggleReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "TOGGLE_SIGNIN_WINDOW":
      return {
        ...state,
        isSignUpWindowOpen: false,
        isSignInWindowOpen: actions.payload,
      };
    case "TOGGLE_SIGNUP_WINDOW":
      return {
        ...state,
        isSignInWindowOpen: false,
        isSignUpWindowOpen: actions.payload,
      };
    case "TOGGLE_ADD_FOOD_WINDOW":
      return {
        ...state,
        isSignInWindowOpen: false,
        isSignUpWindowOpen: false,
        isAddFoodWindowOpen: actions.payload,
      };
    default:
      return state;
  }
};

export default toggleReducer;
