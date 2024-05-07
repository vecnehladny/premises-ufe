import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { RoomsListApiFactory, RoomEntry} from '../../api/premises-wl';

@Component({
  tag: 'vecnehladny-premises-wl-list',
  styleUrl: 'vecnehladny-premises-wl-list.css',
  shadow: true,
})
export class VecnehladnyPremisesWlList {

  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() buildingId: string;
  @State() errorMessage: string;

  rooms: RoomEntry[];

  private async getRoomsAsync(): Promise<RoomEntry[]>{
    try {
      const response = await
      RoomsListApiFactory(undefined, this.apiBase).
      getRoomList(this.buildingId)
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.rooms = await this.getRoomsAsync();
  }

  render() {
    return (
      <Host>
        {this.errorMessage
        ? <div class="error">{this.errorMessage}</div>
        :
        <md-list>
          {this.rooms.map((room) =>
            <md-list-item onClick={ () => this.entryClicked.emit(room.id)}>
              <div slot="headline">{room.id}</div>
              <div slot="supporting-text">{room.status}</div>
            </md-list-item>
          )}
        </md-list>
         }
         <md-filled-icon-button class="add-button"
       onclick={() => this.entryClicked.emit("@new")}>
       <md-icon>add</md-icon>
     </md-filled-icon-button>
      </Host>
    );
  }

}
