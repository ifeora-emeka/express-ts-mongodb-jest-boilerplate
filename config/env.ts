import envSchema from 'env-schema';
import { Type } from '@sinclair/typebox';

const schema = Type.Object({
  NODE_ENV: Type.Optional(Type.Union([
    Type.Literal('development'),
    Type.Literal('production'),
    Type.Literal('test')
  ], { default: 'development' })),
  PORT: Type.Optional(Type.Number({ default: 3000 })),
  MONGO_URI: Type.String({ default: 'mongodb://localhost:27017/express-ts-api' }),
  LOG_LEVEL: Type.Optional(Type.Union([
    Type.Literal('error'),
    Type.Literal('warn'),
    Type.Literal('info'),
    Type.Literal('debug')
  ], { default: 'info' })),
  RATE_LIMIT_WINDOW_MS: Type.Optional(Type.Number({ default: 900000 })), // 15 minutes
  RATE_LIMIT_MAX: Type.Optional(Type.Number({ default: 100 })),
  CORS_ORIGIN: Type.Optional(Type.String({ default: '*' }))
});

type Env = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGO_URI: string;
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
  CORS_ORIGIN: string;
};

const config = envSchema<Env>({
  schema,
  dotenv: true,
  data: process.env
});

export default config;