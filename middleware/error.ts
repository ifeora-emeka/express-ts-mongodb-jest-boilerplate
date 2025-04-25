import { Request, Response, NextFunction } from 'express';
import env from '@config/env';

export class ErrorMiddleware {
  public static notFound(req: Request, res: Response, next: NextFunction): void {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  }

  public static handler(err: any, req: Request, res: Response, next: NextFunction): void {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    
    res.json({
      message: err.message,
      stack: env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }
}