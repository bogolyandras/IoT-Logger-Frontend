import { IoTLoggerFrontendPage } from './app.po';

describe('io-t-logger-frontend App', () => {
  let page: IoTLoggerFrontendPage;

  beforeEach(() => {
    page = new IoTLoggerFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
