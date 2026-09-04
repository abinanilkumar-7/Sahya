import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { connectDB } from './config/db';
import { setupSockets } from './sockets/socketHandler';

import authRoutes from './routes/authRoutes';
import resourceRoutes from './routes/resourceRoutes';
import emergencyRoutes from './routes/emergencyRoutes';
import complaintRoutes from './routes/complaintRoutes';
import volunteerRoutes from './routes/volunteerRoutes';
import assistantRoutes from './routes/assistantRoutes';

import path from 'path';

// Load .env from server directory first, and root workspace directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Setup Socket.IO
setupSockets(io);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/assistant', assistantRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    service: 'Sahya API Server',
    status: 'ONLINE',
    database: isDbConnected ? 'CONNECTED' : 'DISCONNECTED',
    databaseHost: isDbConnected ? mongoose.connection.host : null,
    databaseName: isDbConnected ? mongoose.connection.name : null,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  SAHYA BACKEND SERVER RUNNING ON PORT ${PORT} `);
  console.log(`=================================================`);
});
