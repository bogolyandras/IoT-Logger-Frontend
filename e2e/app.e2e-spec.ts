import { IoTLoggerFrontendPage } from './app.po';

describe('io-t-logger-frontend App', () => {
  let page: IoTLoggerFrontendPage;

  beforeEach(() => {
    page = new IoTLoggerFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
