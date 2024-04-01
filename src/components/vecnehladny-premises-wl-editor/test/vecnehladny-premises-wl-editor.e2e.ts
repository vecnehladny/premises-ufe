import { newE2EPage } from '@stencil/core/testing';

describe('vecnehladny-premises-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vecnehladny-premises-wl-editor></vecnehladny-premises-wl-editor>');

    const element = await page.find('vecnehladny-premises-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
