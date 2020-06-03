const express = require('express');

const server = express();

server.use(express.json())

//custom middleware

function logger(req, res, next) {
  
  const date = new Date().toString()
  const method = req.method
  const url = req.url
  
  console.log(`---${date}---- ${method}-------${url}---`)
  next()

}
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
