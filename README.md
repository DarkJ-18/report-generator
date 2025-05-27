# Generador de Reportes

Este proyecto es una aplicación sencilla para generar facturas en formato PDF. Utiliza Express.js para el servidor, EJS para las plantillas HTML, Mongoose para la interacción con MongoDB y PDFKit para la generación de PDFs.

## Estructura del Proyecto

```
report-generator
├── .env
├── .env example
├── .gitignore
├── package.json
├── README.md
└── src
    ├── app.js
    ├── config
    │   └── connection.js
    ├── controllers
    │   └── reportController.js
    ├── model
    │   └── facturas_models.js
    └── templates
        └── createInvoice.ejs
```

## Instalación

1.  Clona el repositorio:
    ```sh
    git clone https://github.com/DarkJ-18/report-generator.git
    cd report-generator
    ```

2.  Instala las dependencias:
    ```sh
    npm install
    ```

3.  Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno. Puedes usar el archivo `.env example` como plantilla:
    ```
    BD=nombre_tu_base_de_datos
    USUARIOBD=tu_usuario_mongodb
    PASSBD=tu_contraseña_mongodb
    PORT=3000
    ```

## Uso

1.  Inicia el servidor:
    ```sh
    npm start
    ```

2.  Accede al formulario para crear facturas en tu navegador en `http://localhost:PORT/` o `http://localhost:PORT/crear-factura` (reemplaza `PORT` con el puerto que configuraste en tu archivo `.env`, por defecto es 3000).

3.  Completa el formulario y haz clic en "Generar Factura". Esto enviará una solicitud POST a `/generate-invoice` con los datos de la factura, la guardará en la base de datos y te permitirá descargar el PDF.

## Ejemplo de Datos del Formulario (enviados a `/generate-invoice`)

Cuando envías el formulario desde `createInvoice.ejs`, los datos se envían en formato `application/x-www-form-urlencoded`. El campo `items` se envía como una cadena JSON.

**Campos del formulario:**
*   `customerName`: (String) Nombre del Cliente
*   `customerAddress`: (String) Dirección del Cliente
*   `date`: (String) Fecha de la factura
*   `invoiceNumber`: (String) Número de Factura
*   `items`: (String JSON) Cadena JSON que representa los ítems de la factura. Ejemplo:
    ```json
    [
      {
        "description": "Producto 1",
        "quantity": 2,
        "price": 50,
        "total": 100
      },
      {
        "description": "Servicio A",
        "quantity": 1,
        "price": 150,
        "total": 150
      }
    ]
    ```
*   `totalAmount`: (Number) Monto total de la factura.

El controlador [`src/controllers/reportController.js`](/home/tarde/Documentos/report-generator/src/controllers/reportController.js) procesa estos datos, guarda la factura en MongoDB y genera el PDF.

## Variables de Entorno

La aplicación utiliza las siguientes variables de entorno (definidas en el archivo `.env`):

*   `BD`: Nombre de la base de datos MongoDB.
*   `USUARIOBD`: Usuario para la conexión a MongoDB.
*   `PASSBD`: Contraseña para la conexión a MongoDB.
*   `PORT`: Puerto en el que se ejecutará el servidor (ej. `3000`).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.