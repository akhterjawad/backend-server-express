// import express from "express"
// const app = express()
// const port = 3000

// // middleware
// app.use(express.json())
// // middleware ka istemal hum karte hain jab humein backend par incoming JSON data ko parse karna hota hai. Jab bhi client (jaise frontend ya Postman) koi JSON data bhejta hai request body mein, to yeh middleware us data ko parse karke readable bana deta hai, taa ke aap req.body ke through us data ko access kar sako.
// // yeh POST, PUT, aur PATCH methods ke sath zyada use hota hai, kyun ke in methods mein hum aksar data server ko bhejte hain (jaise form data ya koi JSON object).

// app.get('/', (req, res) => {
//   res.send('hello backend')
//   // Yeh sirf ek response bhej raha hai client ko, jo frontend ya Postman pe dikhega. Is case mein server client ko hello backend string return kar raha hai.
// })

// app.listen(port, () => {
//   console.log(port);
// })

// import express from "express"
// const app = express()
// const port = 3000

// // middleware
// app.use(express.json())
// // Yeh middleware ensure karta hai ke incoming JSON data ko parse kare, taa ke hum req.body ke zariye access kar saken.
// // Without express.json(), req.body undefined hoga.

// let userArray = [];

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

// app.post('/user', (req, res) => {
//   const {
//     name
//   } = req.body //Yeh client ke bheje hue data ko represent karta hai (jo JSON format mein hota hai).
//   if (!name) {
//     return res.status(400).json({ error: "Name is required" });
//   }
//   userArray.push(name)
//   res.status(201).json({ // Iska use tab hota hai jab koi naya resource (jaise user) successfully create ho.
//     userArray
//   })
// })

// app.listen(port, () => { console.log(port) });

// dotenv
import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });
// Yeh ek custom middleware tha jo har request ke time ko console karta tha, magar ab comment kiya gaya hai.

const users = [
  {
    data: {
      title: "farhan",
      id: 3,
    },
  },
  {
    data: {
      title: "jawad",
      id: 4,
    },
  },
  {
    data: {
      title: "subhan",
      id: 5,
    },
  },
];

app.get("/", (req, res) => {
  res.send("hello world!");
});

// add new user
app.post("/user", (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({
      message: "title is required",
    });
    return;
  }

  users.push({
    title,
    id: Date.now(),
  });

  res.status(201).json({
    message: "user is created",
    data: users,
  });
});

// get all user
app.get("/users", (req, res) => {
  res.status(200).json({
    data: users,
  });
});

// get single user
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({
      message: "user not found",
    });
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
    res.status(404).json({
      message: "user not found",
    });
    return;
  }
  users.splice(index, 1);

  res.status(200).json({
    data: users,
  });
});
app.put("/user/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((item) => item.id === +id);
  if (index === -1) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const { title } = req.body;
  users[index].title = title;
  console.log(users);

  res.status(200).json({
    message: "user updated",
    title,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// get
// post
// delete
// put

// 404 not found

// res      jo hum mangwaraha ha database sa
// req      jo hum bhajraha ha database sa
