let express = require("express");

let app = express();
app.use(express.json());

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
app.use(checktoken); // middle were

app.get("/", (req, res) => {
  res.send({
    status: 89,
    msg: "home working",
  });
});

app.get("/News", (req, res) => {
  res.send({
    status: 89,
    msg: "News working",
  });
});

app.get("/News/:id", (req, res) => {
  let CurrentId = req.params.id;
  res.send("news data id: " + CurrentId);
});

app.post("/products", (req, res) => {
  console.log(req);

  res.send({
    bodyData: req.body,
    queryData: req.query,
  });
});

app.listen("8000");
