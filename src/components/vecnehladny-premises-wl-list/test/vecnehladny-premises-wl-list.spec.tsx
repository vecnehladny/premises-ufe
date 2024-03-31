import { newSpecPage } from '@stencil/core/testing';
import { VecnehladnyPremisesWlList } from '../vecnehladny-premises-wl-list';

describe('vecnehladny-premises-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VecnehladnyPremisesWlList],
      html: `<vecnehladny-premises-wl-list></vecnehladny-premises-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <vecnehladny-premises-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </vecnehladny-premises-wl-list>
    `);
  });
});
