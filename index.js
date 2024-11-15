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




import express from "express"
const app = express()
const port = 3000

// middleware
app.use(express.json())
// Yeh middleware ensure karta hai ke incoming JSON data ko parse kare, taa ke hum req.body ke zariye access kar saken.
// Without express.json(), req.body undefined hoga.

let userArray = [];

app.get('/', (req, res) => {
  res.send('hello world')
})



app.post('/user', (req, res) => {
  const {
    name
  } = req.body //Yeh client ke bheje hue data ko represent karta hai (jo JSON format mein hota hai).
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.status(201).json({ // Iska use tab hota hai jab koi naya resource (jaise user) successfully create ho.
    name
  })
  userArray.push(name)
})


app.listen(port, () => { console.log(port) });