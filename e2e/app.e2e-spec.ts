import { AngularTraversalPage } from './app.po';

describe('angular-traversal App', function() {
  let page: AngularTraversalPage;

  beforeEach(() => {
    page = new AngularTraversalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
