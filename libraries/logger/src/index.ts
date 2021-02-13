import { LogLevel, logLevelToString } from './logLevel';

export { LogLevel } from './logLevel';

interface GenericObject {
  [key: string]: any;
}

interface LogFunctions {
  (message?: any, ...optionalParams: any[]): void;
}

export default class Logger {
  private serviceName: string;

  constructor(service: string) {
    this.serviceName = service.toUpperCase();
  }

  private _log(
    logFunction: LogFunctions,
    logLevel: LogLevel,
    message?: string,
    data?: string | number | GenericObject
  ): void {
    if (!data) {
      logFunction('[%s][%s] %s', this.serviceName, logLevelToString(logLevel), message);
    } else if (!message) {
      logFunction('[%s][%s] Data: %o', this.serviceName, logLevelToString(logLevel), data);
    } else {
      logFunction(
        '[%s][%s] %s\nData: %o',
        this.serviceName,
        logLevelToString(logLevel),
        message,
        data
      );
    }
  }

  /**
   * Gera um log de `debug`.
   * @param message Identificador da mensagem.
   * @param data Dados a serem exibidos.
   */
  public debug(message?: string, data?: string | number | GenericObject): void {
    this._log(console.log, LogLevel.Debug, message, data);
  }

  /**
   * Gera um log de `informação`.
   * @param message Identificador da mensagem.
   * @param data Dados a serem exibidos.
   */
  public info(message?: string, data?: string | number | GenericObject): void {
    this._log(console.log, LogLevel.Information, message, data);
  }

  /**
   * Gera um log de `aviso`.
   * @param message Identificador da mensagem.
   * @param data Dados a serem exibidos.
   */
  public warn(message?: string, data?: string | number | GenericObject): void {
    this._log(console.warn, LogLevel.Warning, message, data);
  }

  /**
   * Gera um log de `erro`.
   * @param message Identificador da mensagem.
   * @param data Dados a serem exibidos.
   */
  public error(message?: string, data?: string | number | GenericObject): void {
    this._log(console.error, LogLevel.Error, message, data);
  }
}
