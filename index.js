import express from "express";

const app = express()

app.listen(5001, () => console.log('API runing on port 5001'))

app.get('/', (req, res) => res.json('My api running perfectly Enahnce'))