// import express from "express";

// const app = express()

// app.listen(5001, () => console.log('API runing on port 5001'))

// app.get('/', (req, res) => res.json('My api running perfectly Enahnce'))

const express = require('express');
const res = require('express/lib/response');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);
// app.get('/', (req, res) => {
//     // res.send(`You reached to the server.`)
// });
//Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({message: err.message});
});

app.listen(5001,() => console.log('Server running on port 5001'));
