require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.OBSERVED_PORT;

app.use(express.json());

const SendMailController = new (require('./src/Controllers/SendMailController'))(
    process.env.USER_SMTP,
    process.env.PASS_SMTP,
    process.env.SEND_MAIL_FROM,
    process.env.APP_DEBUG
);
app.post('/sendMail', SendMailController.controller.bind(SendMailController));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});