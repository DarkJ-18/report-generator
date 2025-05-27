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
    Una vez que hayas instalado las dependencias y configurado el archivo `.env`, puedes iniciar la aplicación.

    *   **Para producción o uso normal:**
        ```sh
        npm start
        ```
    *   **Para desarrollo (con recarga automática al guardar cambios):**
        Este proyecto está configurado para usar `nodemon` para el desarrollo, lo que reiniciará automáticamente el servidor cuando detecte cambios en los archivos.
        Primero, asegúrate de tener `nodemon` instalado. Puedes instalarlo globalmente:
        ```sh
        npm install -g nodemon
        ```
        O como una dependencia de desarrollo en tu proyecto:
        ```sh
        npm install --save-dev nodemon
        ```
        Luego, ejecuta el siguiente comando para iniciar el servidor en modo de desarrollo:
        ```sh
        npm run dev
        ```
    Si todo está configurado correctamente, verás un mensaje en la consola indicando que el servidor está en línea y el puerto en el que está escuchando (ej. `Servidor en línea, puerto 3000`).

2.  **Accede a la aplicación:**
    Abre tu navegador web y ve a la siguiente dirección:
    ```
    http://localhost:PORT/
    ```
    Reemplaza `PORT` con el número de puerto que configuraste en tu archivo `.env` (o 3000 si no lo cambiaste).

3.  **Crea una factura:**
    Una vez que la aplicación esté en funcionamiento, puedes crear una factura accediendo a la ruta `/create-invoice`. Completa el formulario con los datos necesarios y envíalo. La aplicación generará un PDF de la factura y lo guardará en la base de datos.
4.  **Verifica las facturas:**
    Puedes ver las facturas generadas accediendo a la ruta `/invoices`. Aquí se mostrará una lista de todas las facturas creadas, y podrás descargar cada una de ellas en formato PDF.