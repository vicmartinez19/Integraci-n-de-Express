# Actividad 4: Servidor Backend con Node.js & Express (API RESTful y CRUD)

## 📌 Descripción del Proyecto (Entrega Parte 4)
En esta cuarta entrega se implementa la capa de **Backend** para conectar nuestra aplicación React con un servidor web profesional utilizando **Node.js** y **Express**:
- Inicialización de servidor con Express (`src/server.js`) escuchando en el puerto 3001.
- Middlewares esenciales: `cors` (para permitir peticiones desde clientes web) y `express.json` (para deserializar cuerpos de petición).
- Endpoint inicial: `GET /api/saludo` ("Hola Mundo").
- Operaciones **CRUD completas**:
  - `GET /api/chats`: Listar todos los chats.
  - `GET /api/chats/:id`: Leer un chat específico por su ID con sus mensajes.
  - `POST /api/chats`: Crear un nuevo chat con mensajes iniciales.
  - `PUT /api/chats/:id`: Actualizar el título de un chat existente.
  - `DELETE /api/chats/:id`: Eliminar un chat del sistema.
- Interfaz web interactiva en `public/index.html` para probar cada endpoint con un clic directamente desde el navegador.
