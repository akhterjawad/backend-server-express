let http = require("http");
let server = http.createServer((req,res) => {
    res.end("Hello Brather")
});


server.listen("8000") // http://Localhost:8000