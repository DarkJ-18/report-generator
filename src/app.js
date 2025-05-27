const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const reportController = require('./controllers/reportController');
require('./config/connection');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// RUTAS
app.get('/', (req, res) => {
    res.render('createInvoice');
});
app.post('/generate-invoice', reportController.generateInvoice);
app.get('/invoices', reportController.listInvoices); // Nueva ruta para listar facturas
app.get('/invoice/:id/download', reportController.downloadInvoicePdf); // Nueva ruta para descargar un PDF específico


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
}
);