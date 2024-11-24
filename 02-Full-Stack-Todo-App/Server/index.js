import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses JSON payloads

app.get("/", (req, res) => {
  res.send("hello world");
});
const users = [
  { id: 1, username: "abd" },
  { id: 2, username: "usman" },
];

app.get("/about", (req, res) => {
  res.send("hello about");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/user", (req, res) => {
  const { username } = req.body;
  users.push({
    id: users.length + 1,
    username: username,
  });

  res.status(201).json({ users });
});

// single user
app.post("/user/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    data: users[index],
  });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  users.splice(index, 1);
  res.status(200).json({
    users,
  });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((item) => item.id === +id);
  if (index === -1) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const { username } = req.body;
  users[index].data.username = username;
  res.status(200).json({
    message: "user updated",
    users,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
