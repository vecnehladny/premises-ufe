import { Component, Event, EventEmitter,  Host, h } from '@stencil/core';

@Component({
  tag: 'vecnehladny-premises-wl-list',
  styleUrl: 'vecnehladny-premises-wl-list.css',
  shadow: true,
})
export class VecnehladnyPremisesWlList {

  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;

  premises: any[];

  private async getPremisesAsync(){
    return await Promise.resolve(
      [{
          name: 'Ambulancia',
          premiseId: '10001',
          since: new Date(Date.now() - 10 * 60).toISOString(),
          estimatedStart: new Date(Date.now() + 65 * 60).toISOString(),
          icon: 'admin_meds'
      }, {
          name: 'Liečebňa',
          premiseId: '10096',
          since: new Date(Date.now() - 30 * 60).toISOString(),
          estimatedStart: new Date(Date.now() + 30 * 60).toISOString(),
          icon: 'single_bed'
      }, {
          name: 'Ordinácia',
          premiseId: '10028',
          since: new Date(Date.now() - 72 * 60).toISOString(),
          estimatedStart: new Date(Date.now() + 5 * 60).toISOString(),
          icon: 'stethoscope'
      }]
    );
  }

  async componentWillLoad() {
    this.premises = await this.getPremisesAsync();
  }

  render() {
    return (
      <Host>
        <md-list>
          {this.premises.map((premise, index) =>
            <md-list-item onClick={ () => this.entryClicked.emit(index.toString())}>
              <div slot="headline">{premise.name}</div>
              <div slot="supporting-text">{"Predpokladaný vstup: " + this.isoDateToLocale(premise.estimatedStart)}</div>
                <md-icon slot="start">{premise.icon}</md-icon>
            </md-list-item>
          )}
        </md-list>
      </Host>
    );
  }

  private isoDateToLocale(iso:string) {
    if(!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString()
  }

}
