import { NewNasaApodPage } from './app.po';

describe('new-nasa-apod App', function() {
  let page: NewNasaApodPage;

  beforeEach(() => {
    page = new NewNasaApodPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
