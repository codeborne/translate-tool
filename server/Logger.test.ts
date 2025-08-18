import logger from './Logger';

describe('Logger', () => {
  const date = Date.parse('9 April 2020 16:30:00');

  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(date);
  });

  it('outputs error', async () => {
    const log = vi.spyOn(console, 'error');
    logger.error('a test error');
    expect(log).toHaveBeenCalledWith('[2020-04-09 16:30] [ERROR] a test error');
  });

  it('outputs info log', async () => {
    const log = vi.spyOn(console, 'info');
    logger.info('an info log');
    expect(log).toHaveBeenCalledWith('[2020-04-09 16:30] [INFO] an info log');
  });

  it('outputs regular log', async () => {
    const log = vi.spyOn(console, 'log');
    logger.log('some kind of intended log');
    expect(log).toHaveBeenCalledWith('[2020-04-09 16:30] some kind of intended log');
  });
});
