import { MultifacturasPage } from './app.po';

describe('multifacturas App', function() {
  let page: MultifacturasPage;

  beforeEach(() => {
    page = new MultifacturasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
