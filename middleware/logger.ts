import { Request, Response, NextFunction } from 'express';
import { Logger } from '@config/logger';

const logger = new Logger('HttpMiddleware');

export class LoggerMiddleware {
  public static logRequest(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    const { method, originalUrl, ip } = req;
    
    logger.info(`${method} ${originalUrl} - Request received from ${ip}`);
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      
      if (statusCode >= 400) {
        logger.error(`${method} ${originalUrl} ${statusCode} - Response sent in ${duration}ms`);
      } else {
        logger.info(`${method} ${originalUrl} ${statusCode} - Response sent in ${duration}ms`);
      }
    });
    
    next();
  }
}