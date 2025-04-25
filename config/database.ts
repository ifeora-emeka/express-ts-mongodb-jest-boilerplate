import mongoose from 'mongoose';
import env from '@config/env';
import { Logger } from './logger';

export class Database {
  private logger: Logger;
  
  constructor() {
    this.logger = new Logger('Database');
    
    // Handle MongoDB connection errors after initial connection
    mongoose.connection.on('error', (error) => {
      this.logger.error('MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      this.logger.warn('MongoDB disconnected');
    });
    
    // Handle process termination and close DB connection
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }
  
  public async connect(): Promise<mongoose.Connection> {
    try {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(env.MONGO_URI, {
          serverSelectionTimeoutMS: 5000, // Timeout after 5s
          socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        this.logger.info(`MongoDB connected to ${env.MONGO_URI}`);
      }
      
      return mongoose.connection;
    } catch (error) {
      this.logger.error('Failed to connect to MongoDB', error);
      process.exit(1);
    }
  }
  
  public async disconnect(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      this.logger.info('MongoDB disconnected');
    }
  }
}