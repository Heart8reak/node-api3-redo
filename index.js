// code away!
const server = require('./server')

// console.log(process.env)

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`\n*** Server is Running on http://localhost:${PORT} ***`)
})