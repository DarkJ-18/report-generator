# Generador de Facturas en PDF

Este proyecto es una aplicación web sencilla que permite crear, listar y descargar facturas en formato PDF. Está desarrollada con Node.js y Express.js para el backend, EJS para las vistas, Mongoose para la gestión de datos en MongoDB y PDFKit para la generación de archivos PDF.

## Características

- **Creación de facturas:** Completa un formulario web para generar facturas personalizadas.
- **Generación automática de PDF:** Cada factura se convierte automáticamente en un archivo PDF descargable.
- **Almacenamiento en MongoDB:** Todas las facturas se guardan en una base de datos MongoDB para su consulta posterior.
- **Listado de facturas:** Visualiza todas las facturas generadas y descarga cualquier factura en PDF.


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
        ├── createInvoice.ejs
        └── viewInvoices.ejs
```

## Instalación

1. **Clona el repositorio:**
    ```sh
    git clone https://github.com/DarkJ-18/report-generator.git
    cd report-generator
    ```

2. **Instala las dependencias:**
    ```sh
    npm install
    ```

3. **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Puedes copiar el archivo `.env example` y completarlo con tus datos:
    ```
    BD=nombre_de_tu_base_de_datos_mongodb
    USUARIOBD=tu_usuario_de_mongodb
    PASSBD=tu_contraseña_de_mongodb
    PORT=3000
    ```
    - `BD`: Nombre de la base de datos en MongoDB.
    - `USUARIOBD`: Usuario de MongoDB Atlas o local.
    - `PASSBD`: Contraseña de MongoDB.
    - `PORT`: Puerto para la aplicación (por defecto 3000).

## Uso

1. **Inicia el servidor:**

    - **Modo producción:**
        ```sh
        npm start
        ```
    - **Modo desarrollo (con recarga automática):**
        Asegúrate de tener `nodemon` instalado:
        ```sh
        npm install -g nodemon
        ```
        Luego ejecuta:
        ```sh
        npm run dev
        ```

    Si todo está correcto, verás un mensaje indicando que el servidor está corriendo y el puerto asignado.

2. **Accede a la aplicación:**
    Abre tu navegador y visita:
    ```
    http://localhost:PORT/
    ```
    Reemplaza `PORT` por el valor configurado en tu `.env`.

3. **Crea una factura:**
    - Ve a la página principal (`/`) y completa el formulario para crear una nueva factura.
    - Al enviar el formulario, se generará un PDF descargable y la factura se guardará en la base de datos.

4. **Consulta y descarga facturas:**
    - Accede a `/invoices` para ver la lista de facturas generadas.
    - Desde esta página puedes descargar cualquier factura en formato PDF.

## Tecnologías utilizadas

- **Node.js** y **Express.js**: Backend y servidor web.
- **EJS**: Motor de plantillas para las vistas.
- **Mongoose**: Modelado de datos y conexión con MongoDB.
- **PDFKit**: Generación de archivos PDF.
- **dotenv**: Gestión de variables de entorno.


---

Desarrollado por [DarkJ-18](https://github.com/DarkJ-18)