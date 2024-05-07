import { newSpecPage } from '@stencil/core/testing';
import { VecnehladnyPremisesWlList } from '../vecnehladny-premises-wl-list';

describe('vecnehladny-premises-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VecnehladnyPremisesWlList],
      html: `<vecnehladny-premises-wl-list></vecnehladny-premises-wl-list>`,
    });
    const wlList = page.rootInstance as VecnehladnyPremisesWlList;
    const expectedPremises = wlList?.rooms?.length
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPremises);
  });
});
