import { newSpecPage } from '@stencil/core/testing';
import { VecnehladnyPremisesWlEditor } from '../vecnehladny-premises-wl-editor';

describe('vecnehladny-premises-wl-editor', () => {
  it('buttons shall be of different type', async () => {
    const page = await newSpecPage({
      components: [VecnehladnyPremisesWlEditor],
      html: `<vecnehladny-premises-wl-editor entry-id="@new"></vecnehladny-premises-wl-editor>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-filled-tonal-button");
    expect(items.length).toEqual(1);
  });
});