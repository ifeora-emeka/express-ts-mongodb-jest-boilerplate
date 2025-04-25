import env from './env';

export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  info(message: string, ...meta: any[]): void {
    if (this.isLevelEnabled('info')) {
      const formattedMessage = this.formatMessage('INFO', message);
      console.log(formattedMessage, ...meta);
    }
  }

  error(message: string | Error, ...meta: any[]): void {
    if (this.isLevelEnabled('error')) {
      const errorMessage = message instanceof Error ? message.stack || message.message : message;
      const formattedMessage = this.formatMessage('ERROR', errorMessage as string);
      console.error(formattedMessage, ...meta);
    }
  }

  warn(message: string, ...meta: any[]): void {
    if (this.isLevelEnabled('warn')) {
      const formattedMessage = this.formatMessage('WARN', message);
      console.warn(formattedMessage, ...meta);
    }
  }

  debug(message: string, ...meta: any[]): void {
    if (this.isLevelEnabled('debug')) {
      const formattedMessage = this.formatMessage('DEBUG', message);
      console.debug(formattedMessage, ...meta);
    }
  }

  private isLevelEnabled(level: string): boolean {
    const logLevels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };

    const configLogLevel = (env.LOG_LEVEL || 'info').toLowerCase();
    const currentLevelValue = logLevels[level as keyof typeof logLevels] || 2;
    const configLevelValue = logLevels[configLogLevel as keyof typeof logLevels] || 2;

    return currentLevelValue <= configLevelValue;
  }
}