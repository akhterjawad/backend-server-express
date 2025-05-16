let MyToken = "123456";
let checktoken = (req, res, next) => {
  if (req.query.token == "" || undefined) {
    return res.send({
      status: 400,
      message: "token is required",
    });
  }
  if (req.query.token == !MyToken) {
    return res.send({
      status: 400,
      message: "token is not correct",
    });
  }

  next();
};
module.exports={checktoken}