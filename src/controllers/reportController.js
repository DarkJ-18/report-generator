const Invoice = require('../model/facturas_models');
const path = require('path');
const ejs = require('ejs');
const PDFDocument = require('pdfkit'); // Necesario para generar el PDF

class ReportController {
    async generateInvoice(req, res) {
        try {
            const invoiceData = req.body;
            if (typeof invoiceData.items === 'string') {
                invoiceData.items = JSON.parse(invoiceData.items);
            }
            console.log('Datos recibidos:', invoiceData);

            const invoice = new Invoice(invoiceData);
            await invoice.save();

            console.log('Factura guardada:', invoice);

            // Generar el PDF con PDFKit
            const doc = new PDFDocument({ margin: 50 });
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=invoice.pdf',
                });
                res.send(pdfBuffer);
            });

            // Encabezado
            doc.fontSize(20).text('Factura', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Fecha: ${invoice.date}`);
            doc.text(`Número de Factura: ${invoice.invoiceNumber}`);
            doc.moveDown();
            doc.text('Cliente:', { bold: true });
            doc.text(invoice.customerName);
            doc.text(invoice.customerAddress);
            doc.moveDown();

            // Título de ítems
            doc.fontSize(14).text('Ítems', { underline: true });
            doc.moveDown(0.5);

            // Tabla de ítems
            const tableTop = doc.y;
            const itemSpacing = 25;

            doc
                .fontSize(12)
                .text('Descripción', 50, tableTop, { bold: true })
                .text('Cantidad', 230, tableTop)
                .text('Precio', 330, tableTop)
                .text('Total', 430, tableTop);

            doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

            // Filas
            let positionY = tableTop + 25;

            invoice.items.forEach(item => {
                doc
                    .fontSize(12)
                    .text(item.description, 50, positionY)
                    .text(item.quantity.toString(), 230, positionY)
                    .text(`$${item.price.toFixed(2)}`, 330, positionY)
                    .text(`$${item.total.toFixed(2)}`, 430, positionY);
                positionY += itemSpacing;
            });

            // Total final
            doc.moveDown();
            doc
                .fontSize(14)
                .text(`Total a Pagar: $${invoice.totalAmount.toFixed(2)}`, 0, positionY + 10, { align: 'right' });

            doc.end();

        } catch (err) {
            console.error(err);
            res.status(500).send('Error al generar la factura');
        }
    }

    
}

module.exports = new ReportController();