import Logger, { LogLevel } from '../index';
import { logLevelToString } from '../logLevel';

const serviceName = 'TEST_SERVICE';
const logger = new Logger(serviceName);

const messageCodifiers = {
  message: '[%s][%s] %s',
  data: '[%s][%s] Data: %o',
  messageAndData: '[%s][%s] %s\nData: %o',
};

describe('[LOGGER] index', () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  it('Should log infos', () => {
    const message = 'Alguma Coisa';
    const params = [serviceName, logLevelToString(LogLevel.Information), message];

    logger.info(message, 123);
    expect(console.log).toHaveBeenNthCalledWith(1, messageCodifiers.messageAndData, ...params, 123);

    logger.info(message, 'string');
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      messageCodifiers.messageAndData,
      ...params,
      'string'
    );

    logger.info(message, { any: 'thing' });
    expect(console.log).toHaveBeenNthCalledWith(3, messageCodifiers.messageAndData, ...params, {
      any: 'thing',
    });

    logger.info(message);
    expect(console.log).toHaveBeenNthCalledWith(4, messageCodifiers.message, ...params);

    logger.info(undefined, 'string');
    expect(console.log).toHaveBeenNthCalledWith(
      5,
      messageCodifiers.data,
      params[0],
      params[1],
      'string'
    );
  });

  it('Should log debugs', () => {
    const message = 'Alguma Coisa';
    const params = [serviceName, logLevelToString(LogLevel.Debug), message];

    logger.debug(message, 123);
    expect(console.log).toHaveBeenNthCalledWith(1, messageCodifiers.messageAndData, ...params, 123);

    logger.debug(message, 'string');
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      messageCodifiers.messageAndData,
      ...params,
      'string'
    );

    logger.debug(message, { any: 'thing' });
    expect(console.log).toHaveBeenNthCalledWith(3, messageCodifiers.messageAndData, ...params, {
      any: 'thing',
    });

    logger.debug(message);
    expect(console.log).toHaveBeenNthCalledWith(4, messageCodifiers.message, ...params);

    logger.debug(undefined, 'string');
    expect(console.log).toHaveBeenNthCalledWith(
      5,
      messageCodifiers.data,
      params[0],
      params[1],
      'string'
    );
  });

  it('Should log warnings', () => {
    const message = 'Alguma Coisa';
    const params = [serviceName, logLevelToString(LogLevel.Warning), message];

    logger.warn(message, 123);
    expect(console.warn).toHaveBeenNthCalledWith(
      1,
      messageCodifiers.messageAndData,
      ...params,
      123
    );

    logger.warn(message, 'string');
    expect(console.warn).toHaveBeenNthCalledWith(
      2,
      messageCodifiers.messageAndData,
      ...params,
      'string'
    );

    logger.warn(message, { any: 'thing' });
    expect(console.warn).toHaveBeenNthCalledWith(3, messageCodifiers.messageAndData, ...params, {
      any: 'thing',
    });

    logger.warn(message);
    expect(console.warn).toHaveBeenNthCalledWith(4, messageCodifiers.message, ...params);

    logger.warn(undefined, 'string');
    expect(console.warn).toHaveBeenNthCalledWith(
      5,
      messageCodifiers.data,
      params[0],
      params[1],
      'string'
    );
  });

  it('Should log errors', () => {
    const message = 'Alguma Coisa';
    const params = [serviceName, logLevelToString(LogLevel.Error), message];

    logger.error(message, 123);
    expect(console.error).toHaveBeenNthCalledWith(
      1,
      messageCodifiers.messageAndData,
      ...params,
      123
    );

    logger.error(message, 'string');
    expect(console.error).toHaveBeenNthCalledWith(
      2,
      messageCodifiers.messageAndData,
      ...params,
      'string'
    );

    logger.error(message, { any: 'thing' });
    expect(console.error).toHaveBeenNthCalledWith(3, messageCodifiers.messageAndData, ...params, {
      any: 'thing',
    });

    logger.error(message);
    expect(console.error).toHaveBeenNthCalledWith(4, messageCodifiers.message, ...params);

    logger.error(undefined, 'string');
    expect(console.error).toHaveBeenNthCalledWith(
      5,
      messageCodifiers.data,
      params[0],
      params[1],
      'string'
    );
  });
});
