require('dotenv').config()
const express = require('express');
const helmet = require('helmet')
const cors = require('cors')


const userRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')

const server = express();

server.use(express.json())
server.use(helmet())
server.use(logger)
server.use(cors())

server.use('/api/posts', postsRouter)
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  );
  next()
}

module.exports = server;