const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  maxHttpBufferSize: 50 * 1024 * 1024 // 50MB max file size
});

app.use(express.static(path.join(__dirname, 'public')));

// Store rooms and their messages in memory
const rooms = {}; // { roomCode: { devices: [], messages: [] } }

function generateRoomCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

io.on('connection', (socket) => {
  console.log('Device connected:', socket.id);

  // Create a new room
  socket.on('create-room', ({ deviceName }, callback) => {
    let code;
    do { code = generateRoomCode(); } while (rooms[code]);

    rooms[code] = { devices: [{ id: socket.id, name: deviceName }], messages: [] };
    socket.join(code);
    socket.roomCode = code;
    socket.deviceName = deviceName;

    console.log(`Room ${code} created by ${deviceName}`);
    callback({ success: true, code });
    io.to(code).emit('devices-update', rooms[code].devices.map(d => d.name));
  });

  // Join an existing room
  socket.on('join-room', ({ code, deviceName }, callback) => {
    if (!rooms[code]) {
      return callback({ success: false, error: 'Room not found' });
    }

    rooms[code].devices.push({ id: socket.id, name: deviceName });
    socket.join(code);
    socket.roomCode = code;
    socket.deviceName = deviceName;

    // Send existing messages to the joining device
    callback({ success: true, messages: rooms[code].messages });

    // Notify all in room of new device
    io.to(code).emit('devices-update', rooms[code].devices.map(d => d.name));
    io.to(code).emit('system-msg', `${deviceName} joined the room`);
    console.log(`${deviceName} joined room ${code}`);
  });

  // Send text message
  socket.on('send-text', ({ content, aiEnhanced }) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;

    const msg = {
      id: Date.now(),
      sender: socket.deviceName,
      time: new Date().toLocaleTimeString(),
      type: aiEnhanced ? 'ai-text' : 'text',
      content
    };

    rooms[code].messages.push(msg);
    if (rooms[code].messages.length > 100) rooms[code].messages.shift(); // keep last 100

    // Broadcast to all OTHER devices in room
    socket.to(code).emit('new-message', msg);
  });

  // Send file
  socket.on('send-file', ({ fileName, fileSize, fileIcon, fileData }) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;

    const msg = {
      id: Date.now(),
      sender: socket.deviceName,
      time: new Date().toLocaleTimeString(),
      type: 'file',
      fileName,
      fileSize,
      fileIcon,
      fileData
    };

    rooms[code].messages.push(msg);
    socket.to(code).emit('new-message', msg);
    console.log(`File "${fileName}" sent in room ${code}`);
  });

  // Typing indicator
  socket.on('typing', (isTyping) => {
    const code = socket.roomCode;
    if (code) socket.to(code).emit('typing', { name: socket.deviceName, isTyping });
  });

  // Disconnect
  socket.on('disconnect', () => {
    const code = socket.roomCode;
    if (code && rooms[code]) {
      rooms[code].devices = rooms[code].devices.filter(d => d.id !== socket.id);
      io.to(code).emit('devices-update', rooms[code].devices.map(d => d.name));
      io.to(code).emit('system-msg', `${socket.deviceName} left the room`);

      // Clean up empty rooms after 1 hour
      if (rooms[code].devices.length === 0) {
        setTimeout(() => { if (rooms[code]?.devices.length === 0) delete rooms[code]; }, 3600000);
      }
    }
    console.log('Device disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`AirMind server running on http://localhost:${PORT}`));
