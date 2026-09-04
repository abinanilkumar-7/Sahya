import mongoose from 'mongoose';

export const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/sahya';
  const maskedConnStr = connStr.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');

  console.log(`[MongoDB] Attempting connection to: ${maskedConnStr}`);

  mongoose.connection.on('connected', () => {
    console.log(`[MongoDB] Connected successfully to database: "${mongoose.connection.name}" at host: ${mongoose.connection.host}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`[MongoDB] Runtime connection error:`, err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB] Disconnected from database.');
  });

  try {
    await mongoose.connect(connStr);
  } catch (error: any) {
    console.warn('[MongoDB] Initial connection failed:', error.message);
    console.warn('[MongoDB] Server is running in fallback mock mode. Please verify your MONGODB_URI in .env');
  }
};
