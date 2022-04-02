const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const foodItemRouter = require("./routes/foodItemRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes");

const cors = require("cors");
const app = express();
const AppError = require("./utils/appError");
app.use(cors());
// setting secure header
app.use(helmet());
//it allow max request per windowMs request to server from an ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from an IP, try again later in on hour",
});
app.use("/v1", limiter);

var accessLogStream = rfs.createStream("access.log", {
  interval: "1h",
  path: path.join(__dirname, "log"),
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cookieParser());
//data sanization against noSQL query injections
app.use(mongoSanitize());

//data sanitization from xss
app.use(xss());

//preventing from parameter pollution, removes duplicates query
app.use(
  hpp({
    whitelist: [], // pass parameter for which duplicates are allowed
  })
);

//routes
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/fd/public", express.static(path.join(__dirname, "public")));
app.use("/fd/users/", userRouter);
app.use("/fd/restaurant/", restaurantRouter);
app.use("/fd/foodItem/", foodItemRouter);
app.use("/fd/review/", reviewRouter);
app.use("/fd/cart/", cartRouter);
app.use("/fd/order/", orderRouter);
app.use("/fd/payment/", paymentRouter);
//::PaymentReceipt

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});

module.exports = app;
