const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Base de datos en memoria (para persistencia sin dependencias pesadas de BD)
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

// Endpoint 4: POST /api/chats (Crear un nuevo chat)
app.post('/api/chats', (req, res) => {
  const { title, firstMessage } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "El título es obligatorio." });
  }

  const newChat = {
    id: Date.now(),
    title: title.trim(),
    createdAt: new Date().toISOString(),
    messages: firstMessage ? [
      { id: 1, sender: "user", text: firstMessage },
      { id: 2, sender: "assistant", text: `Respuesta inicial para: "${firstMessage}".` }
    ] : []
  };

  chats.unshift(newChat);
  res.status(201).json({ mensaje: "Chat creado exitosamente", chat: newChat });
});

// Endpoint 5: PUT /api/chats/:id (Actualizar título de un chat)
app.put('/api/chats/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title } = req.body;
  const chat = chats.find(c => c.id === id);

  if (!chat) {
    return res.status(404).json({ error: "Chat no encontrado" });
  }
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "El nuevo título es obligatorio." });
  }

  chat.title = title.trim();
  res.json({ mensaje: "Chat actualizado exitosamente", chat });
});

// Endpoint 6: DELETE /api/chats/:id (Eliminar un chat)
app.delete('/api/chats/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = chats.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Chat no encontrado" });
  }

  const deleted = chats.splice(index, 1);
  res.json({ mensaje: "Chat eliminado exitosamente", chat: deleted[0] });
});

// Endpoint 7: POST /api/chat/generate (Simulación de Ollama / Motor IA)
app.post('/api/chat/generate', (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "El prompt es requerido." });
  }

  res.json({
    prompt,
    response: `[Express Backend] Procesamiento exitoso de "${prompt}". Conectado a la API RESTful de DevfSeek.`,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
  console.log(`👉 Visita http://localhost:${PORT} para acceder a la interfaz de prueba web`);
});