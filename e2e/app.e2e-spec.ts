import { Angular4TrainingV2solPage } from './app.po';

describe('angular4-training-v2sol App', () => {
  let page: Angular4TrainingV2solPage;

  beforeEach(() => {
    page = new Angular4TrainingV2solPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
