import paymentDone from "./paymentDone.component";
import ReactDOM from "react-dom";

// payment component, it uses a razorpay api to complete the payment things
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";
const displayRazorpay = async ({
  user,
  totalAmount,
  cartItems,
  navigate,
  clearCart,
}) => {
  console.log(totalAmount);
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }
  const data = await fetch("/fd/payment/razorpay", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: totalAmount }),
  }).then((t) => t.json());
  const options = {
    key: __DEV__ ? "rzp_test_siVfN0698lFI6G" : "PRODUCTION_KEY",
    currency: data.currency,
    amount: data.amount.toString(),
    order_id: data.id,
    name: "Food ordering",
    description: "Thank you for ordering!",
    image: "",
    handler: function (response) {
      clearCart();
      setTimeout(() => {
        return navigate("/carts");
      }, 6000);
      // CLEAR_CART
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
    },
    prefill: {
      name: user.email.substring(0, user.email.lastIndexOf("@")),
      email: user.email,
      phone_number: "",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export default displayRazorpay;
