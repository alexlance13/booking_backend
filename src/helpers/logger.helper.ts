export enum LogLevel {
  error = 'error',
  log = 'log',
  debug = 'debug'
}

export type Writer = { write: (message: string) => any | Promise<any> };

export default class Logger {
  private levels = Object.keys(LogLevel);

  private enabledLevels: string[] = [];

  private defaultLevel = LogLevel.log;

  private writers: Writer[] = [process.stdout];

  public constructor(logLevel: LogLevel | string, ...writers: Writer[]) {
    if (writers.length) {
      this.writers.push(...writers);
    }

    const currentLogLevel = LogLevel[logLevel] ? logLevel : this.defaultLevel;
    const levelIndex = this.levels.findIndex((level) => level === currentLogLevel);
    this.enabledLevels = this.levels.slice(0, levelIndex + 1);

    return new Proxy(this, {
      get(target, key: LogLevel): any {
        if (!target.levels.includes(key) || target.enabledLevels.includes(key)) {
          return target[key];
        }
        return (): void => undefined;
      },
    });
  }

  public error(error: string | Error, context: string): void {
    const { stack } = new Error();
    const stackArray = stack!.split('\n');
    const currentMethodIndex = stackArray.findIndex((str) => str.includes('Proxy.error'));
    const trimedStack = stackArray.slice(currentMethodIndex + 1).join('\n');
    const message = (error as Error).message || error as string;

    this.printMessage(message, context, trimedStack);
  }

  public log(message: string | Object, context: string): void {
    this.printMessage(message, context);
  }

  public debug(message: string | Object, context: string): void {
    this.printMessage(message, context);
  }

  private printMessage(message: string | Object, context = '', trace = ''): void {
    const output = message && typeof message === 'object'
      ? `Object:\n${JSON.stringify(message, null, 2)}\n`
      : message as string;
    const timestamp = new Date().toISOString();
    const contextMessage = context ? `[${context}] ` : '';
    let fullMessage = `${timestamp} ${contextMessage}${output}`;
    if (/\n$/.test(fullMessage)) {
      fullMessage += '\n';
    }
    if (trace) {
      fullMessage += `${trace}\n`;
    }

    this.writers.forEach((writer) => writer.write(fullMessage));
  }
}
