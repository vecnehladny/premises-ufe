import { newSpecPage } from '@stencil/core/testing';
import { VecnehladnyPremisesWlApp } from '../vecnehladny-premises-wl-app';

describe('vecnehladny-premises-wl-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [VecnehladnyPremisesWlApp],
      html: `<vecnehladny-premises-wl-app base-path="/"></vecnehladny-premises-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("vecnehladny-premises-wl-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/premises-wl/`,
      components: [VecnehladnyPremisesWlApp],
      html: `<vecnehladny-premises-wl-app base-path="/premises-wl/"></vecnehladny-premises-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("vecnehladny-premises-wl-list");
  });
});