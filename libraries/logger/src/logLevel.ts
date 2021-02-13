export enum LogLevel {
  Debug = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
}

export function logLevelToString(logLevel: LogLevel): string {
  switch (logLevel) {
    case LogLevel.Debug:
      return 'DEBUG';
    case LogLevel.Information:
      return 'INFO';
    case LogLevel.Warning:
      return 'WARN';
    case LogLevel.Error:
      return 'ERROR';
  }
}
