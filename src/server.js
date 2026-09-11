const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Base de datos en memoria inicial
let chats = [
  {
    id: 1,
    title: "Preguntas sobre React",
    createdAt: "2026-09-10T10:00:00Z",
    messages: [
      { id: 1, sender: "user", text: "¿Qué es un componente en React?" },
      { id: 2, sender: "assistant", text: "Es una función que devuelve código JSX representando una porción de la UI." }
    ]
  },
  {
    id: 2,
    title: "Consulta sobre Node y Express",
    createdAt: "2026-09-10T11:30:00Z",
    messages: [
      { id: 1, sender: "user", text: "¿Para qué sirve un middleware?" },
      { id: 2, sender: "assistant", text: "Es una función intermedia que procesa solicitudes antes de llegar a la ruta final." }
    ]
  }
];

// Endpoint 1: Hola Mundo y Diagnóstico
app.get('/api/saludo', (req, res) => {
  res.json({
    mensaje: "¡Hola Mundo desde Express!",
    servidor: "DevfSeek Backend API",
    version: "1.0.0",
    status: "online"
  });
});

// Endpoint 2: GET /api/chats (Leer todos los chats)
app.get('/api/chats', (req, res) => {
  res.json({
    total: chats.length,
    chats: chats.map(c => ({ id: c.id, title: c.title, createdAt: c.createdAt, messageCount: c.messages.length }))
  });
});

// Endpoint 3: GET /api/chats/:id (Leer un chat por ID con sus mensajes)
app.get('/api/chats/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const chat = chats.find(c => c.id === id);
  if (!chat) {
    return res.status(404).json({ error: "Chat no encontrado", id });
  }
  res.json(chat);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express Fase 2 ejecutándose en http://localhost:${PORT}`);
});