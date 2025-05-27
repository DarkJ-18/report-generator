const Invoice = require('../model/facturas_models');
const PDFDocument = require('pdfkit');

class ReportController {
    generateInvoice = async (req, res) => {
        try {
            const invoiceData = req.body;
            if (typeof invoiceData.items === 'string') {
                invoiceData.items = JSON.parse(invoiceData.items);
            }
      

            const invoice = new Invoice(invoiceData);
            await invoice.save();

       

            // Generar el PDF con PDFKit
            const doc = new PDFDocument({ margin: 50 });
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename=invoice-${invoice.invoiceNumber || invoice._id}.pdf`,
                });
                res.send(pdfBuffer);
            });

            this._generatePdfContent(doc, invoice); // Lógica de generación de PDF refactorizada
            doc.end();

        } catch (err) {
            console.error('Error al generar la factura:', err);
            res.status(500).send('Error al generar la factura');
        }
    }

    // Método refactorizado para generar el contenido del PDF
    _generatePdfContent = (doc, invoice) => {
        // Encabezado
        doc.fontSize(20).text('Factura', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Fecha: ${new Date(invoice.date).toLocaleDateString()}`); // Formatear fecha
        doc.text(`Número de Factura: ${invoice.invoiceNumber}`);
        doc.moveDown();
        doc.text('Cliente:', { underline: true }); 
        doc.text(invoice.customerName);
        doc.text(invoice.customerAddress);
        doc.moveDown();

        // Título de ítems
        doc.fontSize(14).text('Ítems', { underline: true });
        doc.moveDown(0.5);

        // Tabla de ítems
        const tableTop = doc.y;
        const itemColWidths = {
            description: 250,
            quantity: 70,
            price: 100,
            total: 100
        };
        const startX = 50;

        doc
            .fontSize(10)
            .text('Descripción', startX, tableTop, { width: itemColWidths.description, bold: true })
            .text('Cantidad', startX + itemColWidths.description, tableTop, { width: itemColWidths.quantity, align: 'right' })
            .text('Precio Unit.', startX + itemColWidths.description + itemColWidths.quantity, tableTop, { width: itemColWidths.price, align: 'right' })
            .text('Total', startX + itemColWidths.description + itemColWidths.quantity + itemColWidths.price, tableTop, { width: itemColWidths.total, align: 'right' });

        doc.moveTo(startX, tableTop + 15).lineTo(startX + itemColWidths.description + itemColWidths.quantity + itemColWidths.price + itemColWidths.total, tableTop + 15).stroke();

        // Filas
        let positionY = tableTop + 25;
        const itemSpacing = 20;

        invoice.items.forEach(item => {
            doc
                .fontSize(10)
                .text(item.description, startX, positionY, { width: itemColWidths.description })
                .text(item.quantity.toString(), startX + itemColWidths.description, positionY, { width: itemColWidths.quantity, align: 'right' })
                .text(`$${item.price.toFixed(2)}`, startX + itemColWidths.description + itemColWidths.quantity, positionY, { width: itemColWidths.price, align: 'right' })
                .text(`$${item.total.toFixed(2)}`, startX + itemColWidths.description + itemColWidths.quantity + itemColWidths.price, positionY, { width: itemColWidths.total, align: 'right' });
            positionY += itemSpacing;
            if (positionY > 700) { // Salto de página si es necesario
                doc.addPage();
                positionY = 50; // Reiniciar Y en la nueva página
            }
        });
         doc.moveTo(startX, positionY).lineTo(startX + itemColWidths.description + itemColWidths.quantity + itemColWidths.price + itemColWidths.total, positionY).stroke();


        // Total final
        doc.moveDown();
        doc
            .fontSize(12)
            .text(`Total a Pagar: $${invoice.totalAmount.toFixed(2)}`, 0, positionY + 15, { align: 'right' });
    }

    listInvoices = async (req, res) => {
        try {
            const invoices = await Invoice.find({}).sort({ date: -1 }); // Obtener todas las facturas, ordenadas por fecha descendente
            res.render('viewInvoices', { invoices });
        } catch (err) {
            console.error('Error al listar las facturas:', err);
            res.status(500).send('Error al obtener la lista de facturas');
        }
    }

    downloadInvoicePdf = async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const invoice = await Invoice.findById(invoiceId);

            if (!invoice) {
                return res.status(404).send('Factura no encontrada');
            }

            const doc = new PDFDocument({ margin: 50 });
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename=invoice-${invoice.invoiceNumber || invoice._id}.pdf`,
                });
                res.send(pdfBuffer);
            });

            this._generatePdfContent(doc, invoice); // Reutilizar la lógica de generación de PDF
            doc.end();

        } catch (err) {
            console.error('Error al descargar el PDF de la factura:', err);
            res.status(500).send('Error al descargar el PDF');
        }
    }
}

module.exports = new ReportController();