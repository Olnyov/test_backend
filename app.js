require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.OBSERVED_PORT ? process.env.OBSERVED_PORT : 3000;

app.use(express.json());

const TestController = new (require('./src/Controllers/TestController'))();

app.get('/getData', TestController.controller.bind(TestController));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});