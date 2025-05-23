const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    date: String,
    invoiceNumber: String,
    items: [
        {
            description: String,
            quantity: Number,
            price: Number,
            total: Number
        }
    ],
    totalAmount: Number
});

module.exports = mongoose.model('Invoice', invoiceSchema);