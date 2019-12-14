const express = require('express');
const server = express();


server.get('/', (req, res) => {
    res.send('<h2>Sprint API up and running</h2>')
});

server.use((req, res) => {
    return res.status(404).json({ 
        message: "The page you are looking for does not currently exist. Try again!"})
});

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "An error occured, please try again later."
    })
})

module.exports = server