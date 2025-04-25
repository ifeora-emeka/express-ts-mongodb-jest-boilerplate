import express, { Application, Request, Response } from 'express';
import { SecurityMiddleware } from '@middleware/security';
import { LoggerMiddleware } from '@middleware/logger';
import { ErrorMiddleware } from '@middleware/error';
import { Database } from '@config/database';
import { Logger } from '@config/logger';
import env from '@config/env';

export class App {
  public app: Application;
  private database: Database;
  private logger: Logger;

  constructor() {
    this.app = express();
    this.database = new Database();
    this.logger = new Logger('App');
    
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
    this.initializeDatabase();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(LoggerMiddleware.logRequest);
    SecurityMiddleware.configure(this.app);
  }

  private configureRoutes(): void {
    // Basic health check route for monitoring
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'UP',
        timestamp: new Date(),
        environment: env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0'
      });
    });

    // Root route
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Express + TypeScript Server');
    });
  }

  private configureErrorHandling(): void {
    // Not found middleware
    this.app.use(ErrorMiddleware.notFound);
    
    // Error handling middleware
    this.app.use(ErrorMiddleware.handler);
  }

  private async initializeDatabase(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      try {
        await this.database.connect();
        this.logger.info('Database connection established');
      } catch (error) {
        this.logger.error('Failed to connect to database', error);
      }
    }
  }

  public async closeDatabase(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      try {
        await this.database.disconnect();
        this.logger.info('Database connection closed');
      } catch (error) {
        this.logger.error('Error disconnecting from database', error);
      }
    }
  }
}

export const appInstance = new App();
export default appInstance.app;