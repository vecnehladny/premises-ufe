import { newE2EPage } from '@stencil/core/testing';

describe('vecnehladny-premises-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vecnehladny-premises-wl-list></vecnehladny-premises-wl-list>');

    const element = await page.find('vecnehladny-premises-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
