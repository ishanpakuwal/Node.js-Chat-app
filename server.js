var express = require('express')
var bodyParser = require('body-parser')
//Setting reference to a variable called app from an instance of express
var app = express()
//Now setting up the http server
var http = require('http').Server(app)
//Passing in reference to http, setting it up on the backend
var io = require('socket.io')(http)
// We will need to serve some static content with server.js
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var messages = [
    { name: "John", message: "Hey!" },
    { name: "Rob", message: "Hello there!" }
]

//Specifying the route in the 1st argument and then second argument is the callback 
// to handle the request which will take in request and reference to response
app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200) //To indicate the client that everything went well
})
//Second argument is a function whick takes in socket
io.on('connection', (socket) => {
    console.log('user connected')
})

//Getting the express server started which is now listening for requests
//Passing in the port number and a callback function 
var server = http.listen(3000, () => {
    console.log("Server is now listening to port", server.address().port)
})

