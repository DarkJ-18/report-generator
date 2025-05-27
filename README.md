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

1.  **Clona el repositorio:**
    Si tienes Git instalado, puedes clonar el repositorio usando el siguiente comando en tu terminal:
    ```sh
    git clone https://github.com/DarkJ-18/report-generator.git
    ```
    Luego, navega al directorio del proyecto:
    ```sh
    cd report-generator
    ```

2.  **Instala las dependencias:**
    Este proyecto utiliza Node.js y npm. Asegúrate de tenerlos instalados. Luego, instala las dependencias del proyecto ejecutando:
    ```sh
    npm install
    ```
    Esto descargará todas las librerías necesarias listadas en el archivo `package.json` (como Express, Mongoose, PDFKit, etc.).

3.  **Configura las variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto. Puedes copiar el contenido del archivo `.env example` y rellenarlo con tus propias credenciales y configuraciones.
    ```
    BD=nombre_de_tu_base_de_datos_mongodb
    USUARIOBD=tu_usuario_de_mongodb
    PASSBD=tu_contraseña_de_mongodb
    PORT=3000 
    ```
    *   `BD`: El nombre de tu base de datos en MongoDB.
    *   `USUARIOBD`: Tu nombre de usuario para acceder a MongoDB Atlas o una instancia local.
    *   `PASSBD`: Tu contraseña para MongoDB.
    *   `PORT`: El puerto en el que se ejecutará la aplicación (por defecto, 3000 si no se especifica).

## Uso

1.  **Inicia el servidor:**
    Una vez que hayas instalado las dependencias y configurado el archivo `.env`, puedes iniciar la aplicación con el siguiente comando:
    ```sh
    npm start
    ```
    Si todo está configurado correctamente, verás un mensaje en la consola indicando que el servidor está en línea y el puerto en el que está escuchando (ej. `Servidor en línea, puerto 3000`).

2.  **Accede a la aplicación:**
    Abre tu navegador web y ve a la siguiente dirección:
    ```
    http://localhost:PORT/
    ```
    Reemplaza `PORT` con el número de puerto que configuraste en tu archivo `.env` (o 3000 si no lo cambiaste).

3.  **Crea una factura:**
    *   Verás un formulario para ingresar los detalles de la factura: nombre del cliente, dirección, fecha, número de factura y los ítems.
    *   Puedes agregar múltiples ítems haciendo clic en el botón "Agregar Item".
    *   Para cada ítem, ingresa la descripción, cantidad y precio. El total del ítem y el total general de la factura se calcularán automáticamente.
    *   Puedes eliminar ítems haciendo clic en el botón "Eliminar" de la fila correspondiente.
    *   Una vez que hayas completado todos los datos, haz clic en el botón "Generar Factura".

4.  **Descarga el PDF:**
    Después de hacer clic en "Generar Factura", los datos se enviarán al servidor, se guardarán en la base de datos MongoDB y se generará un archivo PDF con la factura. Tu navegador debería iniciar automáticamente la descarga del archivo `invoice.pdf`.

## Ejemplo de Datos del Formulario (enviados a `/generate-invoice`)
// ...existing code...