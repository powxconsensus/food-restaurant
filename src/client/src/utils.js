export const getRestaurantImageUrl = (imageName, restaurantId) => {
  let image = `http://localhost:4000/fd/public/restaurant/${restaurantId}/images/${imageName}`;
  if (imageName === "defaultRes.png")
    image = `http://localhost:4000/fd/public/default/defaultRes.png`;
  return image;
};

export const getFoodItemImageUrl = (imageName, restaurantId) => {
  let image = `http://localhost:4000/fd/public/restaurant/${restaurantId}/foodItems/${imageName}`;
  if (imageName === "fdDefault.jpg")
    image = `http://localhost:4000/fd/public/default/fdDefault.jpg`;
  return image;
};
