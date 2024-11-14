// import express from "express"
// const app = express()
// const port = 3000

// // middleware
// app.use(express.json())

// app.get('/',(req,res)=>{
// res.send('hello backend')

// })

// app.listen(port,()=>{console.log(port);
// })




import express from "express"
const app = express()
const port = 3000

// middleware
// middleware json ma convert karta ha
app.use(express.json())

let userArray = [];

app.get('/', (req, res) => {
  res.send('hello world')
})



app.post('/user', (req, res) => {
  const {
    name
  } = req.body
  res.status(201).json({
    name
  })
  userArray.push(name)
})


app.listen(port, () => { console.log(port) });