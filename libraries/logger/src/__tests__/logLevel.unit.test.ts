import { LogLevel, logLevelToString } from '../logLevel';

describe('[LOGGER] logLevel', () => {
  it('Should return DEBUG', () => {
    const res = logLevelToString(LogLevel.Debug);

    expect(res).toBe('DEBUG');
  });

  it('Should return INFO', () => {
    const res = logLevelToString(LogLevel.Information);

    expect(res).toBe('INFO');
  });

  it('Should return WARN', () => {
    const res = logLevelToString(LogLevel.Warning);

    expect(res).toBe('WARN');
  });

  it('Should return ERROR', () => {
    const res = logLevelToString(LogLevel.Error);

    expect(res).toBe('ERROR');
  });
});
