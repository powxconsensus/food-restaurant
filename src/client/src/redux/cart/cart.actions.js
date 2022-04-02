export const addToCart = (item) => {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (item) => {
  return {
    type: "REMOVE_ITEM_FROM_CART",
    payload: item,
  };
};

export const clearItemFromCart = (item) => {
  return {
    type: "CLEAR_ITEM_FROM_CART",
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
