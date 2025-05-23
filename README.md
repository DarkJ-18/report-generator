# Generador de Reportes

Este proyecto es una aplicación sencilla para generar facturas utilizando una plantilla HTML predefinida. Utiliza Express.js para el servidor y proporciona una forma estructurada de gestionar la generación de reportes.

## Estructura del Proyecto

```
report-generator
├── src
│   ├── app.js
│   ├── templates
│   │   └── invoiceTemplate.html
│   ├── controllers
│   │   └── reportController.js
│   └── config
│       └── index.js
├── package.json
└── README.md
```

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/DarkJ-18/report-generator.git
   cd report-generator
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso

1. Inicia el servidor:
   ```sh
   npm start
   ```

2. Accede a la aplicación en tu navegador en `http://localhost:3000`.

3. Para generar una factura, envía una solicitud POST a `/generate-invoice` con los datos necesarios de la factura.

## Ejemplo de Solicitud

Aquí tienes un ejemplo de cómo enviar una solicitud para generar una factura:

```json
POST /generate-invoice
Content-Type: application/json

{
  "customerName": "John Doe",
  "items": [
    {
      "description": "Producto 1",
      "amount": 100
    },
    {
      "description": "Producto 2",
      "amount": 200
    }
  ],
  "total": 300
}
```

## Variables de Entorno

Si tu aplicación requiere configuración personalizada (por ejemplo, puerto o credenciales), crea un archivo `.env` en la raíz del proyecto con las variables necesarias. Ejemplo:

```
PORT=3000
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
