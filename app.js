require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.OBSERVED_PORT ? process.env.OBSERVED_PORT : 3000;

app.use(express.json());

const TestController = new (require('./src/Controllers/TestController'))();
const CreateController = new (require('./src/Controllers/CreateController'))();
const MaterialsController = new (require('./src/Controllers/MaterialsController'))();
const DeleteController = new (require('./src/Controllers/DeleteController'))();

app.get('/getData', TestController.controller.bind(TestController));
app.post('/create', CreateController.controller.bind(CreateController));
app.get('/materials', MaterialsController.controller.bind(MaterialsController));
app.delete('/delete', DeleteController.controller.bind(DeleteController));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});