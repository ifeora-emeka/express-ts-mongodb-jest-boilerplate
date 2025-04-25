import { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import env from '@config/env';
import { Logger } from '@config/logger';

const logger = new Logger('SecurityMiddleware');

export class SecurityMiddleware {
  public static configure(app: Application): void {
    // Secure HTTP headers with helmet
    app.use(helmet());
    
    // Enable Cross-Origin Resource Sharing
    app.use(cors({
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    }));
    
    // Rate limiting to prevent brute-force attacks
    const limiter = rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS, // Default: 15 minutes
      max: env.RATE_LIMIT_MAX, // Default: 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    
    // Apply rate limiting to all routes
    app.use(limiter);
    
    // Prevent HTTP Parameter Pollution attacks
    app.use(hpp());
    
    // Disable X-Powered-By header
    app.disable('x-powered-by');
    
    logger.info('Security middleware configured');
  }
}