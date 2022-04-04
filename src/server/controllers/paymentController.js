const Payment = require("../models/paymentDetailModel");
const Razorpay = require("razorpay");
const PaymentDetail = require("../models/paymentDetailModel");
const { nanoid } = require("nanoid");

// tobe implemented many things, distributing money to restaurant account
// Create an instance of Razorpay
const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// exports.createPayment = async (req, res, next) => {
//   params = {
//     amount: req.body.amount * 100,
//     currency: "INR",
//     receipt: nanoid(),
//     payment_capture: "1",
//   };
//   razorPayInstance.orders
//     .create(params)
//     .then(async (response) => {
//       const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
//       // Save orderId and other payment details
//       // const paymentDetail = new PaymentDetail({
//       //   user: req.user.id,
//       //   orderId: response.id,
//       //   receiptId: response.receipt,
//       //   amountRecieved: response.amount,
//       //   currency: response.currency,
//       //   createdAt: response.created_at,
//       //   status: response.status,
//       // });
//       try {
//         // Render Order Confirmation page if saved succesfully
//         // await paymentDetail.save();
//         res.status(200).json({
//           message: "Payment Order saved succesfully",
//           status: "OK",
//           title: "Confirm Order",
//           razorpayKeyId: razorpayKeyId,
//           // paymentDetail: paymentDetail,
//         });
//       } catch (err) {
//         // Throw err if failed to save
//         if (err) throw err;
//       }
//     })
//     .catch((err) => {
//       // Throw err if failed to create order
//       if (err) throw err;
//     });
// };
exports.createPayment = async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = "INR";
  console.log(req);
  const options = {
    amount: amount * 100,
    currency,
    receipt: nanoid(),
    payment_capture,
  };

  try {
    const response = await razorPayInstance.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.verifyPayment = async (req, res, next) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  let crypto = require("crypto");
  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  // Compare the signatures
  if (expectedSignature === req.body.razorpay_signature) {
    // if same, then find the previosuly stored record using orderId,
    // and update paymentId and signature, and set status to paid.
    await PaymentDetail.findOneAndUpdate(
      { orderId: req.body.razorpay_order_id },
      {
        paymentId: req.body.razorpay_payment_id,
        signature: req.body.razorpay_signature,
        status: "paid",
      },
      { new: true },
      function (err, doc) {
        // Throw er if failed to save
        if (err) {
          throw err;
        }
        // Render payment success page, if saved succeffully
        res.status(200).json({
          message: "Payment verification successful",
          status: "OK",
          paymentDetail: doc,
        });
      }
    );
  } else {
    res.status(402).json({
      message: "Payment verification failed",
      status: "fail",
    });
  }
};
