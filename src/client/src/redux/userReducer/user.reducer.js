const INITIAL_STATE = {
  user: null,
};

const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "SET_USER":
      return {
        ...state,
        user: actions.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
