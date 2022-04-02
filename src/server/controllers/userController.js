const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { filterObj } = require("./../utils/util");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

// update user
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Upload Appropiate Image!!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProfilePhoto = upload.fields([
  { name: "userPhoto", maxCount: 1 },
]);

exports.resizeProfilePhoto = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.userPhoto) return next();
  const loginUser = await User.findById(req.user.id);
  if (req.files.userPhoto) {
    if (loginUser.userPhoto != "profileD.png")
      fs.unlink(
        `${__dirname}/../public/users/${loginUser.userPhoto}`,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    req.body.userPhoto = `user-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.files.userPhoto[0].buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/users/${req.body.userPhoto}`);
  }

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "DOB",
    "userPhoto"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "user had been updated successfully",
    updatedUser,
  });
});

exports.updateUserRole = catchAsync(async (req, res) => {
  const { newRole, userId } = req.body;
  const user = await User.findById(userId);
  if (!user)
    return res.status(200).json({
      message: "no user found with given id",
      status: "fail",
    });
  if (user._id.toString() === req.user.id.toString())
    return res.status(200).json({
      messgae: "you are not allowed to change your own role",
      status: "fail",
    });
  if (user.role === "admin")
    return res.status(200).json({
      messgae: "you can only alter roles of user and moderator",
      status: "fail",
    });
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "user role had been updated successfully",
    updatedUser,
  });
});

exports.getLoggedInUser = catchAsync((req, res) => {
  res.status(200).json({
    status: "OK",
    loggedInUser: req.user,
  });
});
