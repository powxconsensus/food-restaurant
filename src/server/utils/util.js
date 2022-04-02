const fs = require("fs");
exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.mkDir = (path) =>
  new Promise((res, rej) => {
    fs.mkdir(path, { recursive: true }, function (err) {
      if (err) rej(err);
      res(true);
    });
  });
