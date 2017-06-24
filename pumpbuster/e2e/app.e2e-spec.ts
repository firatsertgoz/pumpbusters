import { PumpbusterPage } from './app.po';

describe('pumpbuster App', () => {
  let page: PumpbusterPage;

  beforeEach(() => {
    page = new PumpbusterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
