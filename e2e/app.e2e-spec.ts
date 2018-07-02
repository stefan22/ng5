import { Pkrlv4Page } from './app.po';

describe('pkrlv4 App', () => {
  let page: Pkrlv4Page;

  beforeEach(() => {
    page = new Pkrlv4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
