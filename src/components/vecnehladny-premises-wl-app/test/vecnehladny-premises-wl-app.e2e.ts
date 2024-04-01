import { newE2EPage } from '@stencil/core/testing';

describe('vecnehladny-premises-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vecnehladny-premises-wl-app></vecnehladny-premises-wl-app>');

    const element = await page.find('vecnehladny-premises-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
