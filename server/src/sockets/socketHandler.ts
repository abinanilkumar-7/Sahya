import { Server as SocketIOServer, Socket } from 'socket.io';

export const setupSockets = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    socket.on('join_city_room', (city: string) => {
      socket.join(city);
      console.log(`[Socket.IO] ${socket.id} joined room: ${city}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
