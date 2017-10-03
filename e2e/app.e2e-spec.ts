import { SohaRetailsPage } from './app.po';

describe('soha-retails App', function() {
  let page: SohaRetailsPage;

  beforeEach(() => {
    page = new SohaRetailsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
