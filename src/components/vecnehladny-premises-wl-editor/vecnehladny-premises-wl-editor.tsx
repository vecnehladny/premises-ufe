import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { RoomsListApiFactory, RoomEntry } from '../../api/premises-wl';


@Component({
  tag: 'vecnehladny-premises-wl-editor',
  styleUrl: 'vecnehladny-premises-wl-editor.css',
  shadow: true,
})
export class VecnehladnyPremisesWlEditor {

  @Prop() roomId: string;
  @Prop() buildingId: string;
  @Prop() apiBase: string;

  @Event({ eventName: "editor-closed" }) editorClosed: EventEmitter<string>;

  @State() room: RoomEntry;
  @State() errorMessage: string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;
  
  private async getRoomAsync(): Promise<RoomEntry> {
    if (this.roomId === "@new") {
      this.isValid = false;
      this.room = {
        id: "@new",
        type: "",
        status: "Available",
        capacity: 1
      };
      return this.room;
    }

    if (!this.roomId) {
      this.isValid = false;
      return undefined
    }
    try {
      const response = await RoomsListApiFactory(undefined, this.apiBase).getRoomEntry(this.buildingId, this.roomId)

      if (response.status < 299) {
        this.room = response.data;
        this.roomId = this.room.id
        this.isValid = true;
      } else {
        this.errorMessage = `Cannot retrieve room details: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve room details: ${err.message || "unknown"}`
    }
    return undefined;
  }

  componentWillLoad() {
    this.getRoomAsync();
  }

  render() {
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error">{this.errorMessage}</div>
        </Host>
      )
    }
    return (
      <Host>
        <form ref={el => this.formElement = el}>
          <md-filled-text-field label="Room Type"
            required value={this.room?.type}
            oninput={(ev: InputEvent) => { if (this.room) { this.room.type = this.handleInputEvent(ev) } }}>
            <md-icon slot="leading-icon">hotel</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="Room Status"
            required value={this.room?.status}
            oninput={(ev: InputEvent) => { if (this.room) { this.room.status = this.handleInputEvent(ev) } }}>
            <md-icon slot="leading-icon">update</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="Room Capacity"
            required value={this.room?.capacity.toString()}
            oninput={(ev: InputEvent) => { if (this.room) { this.room.capacity = parseInt(this.handleInputEvent(ev), 10) } }}>
            <md-icon slot="leading-icon">group_add</md-icon>
          </md-filled-text-field>
        </form>

        <div class="actions">
          <md-tonal-button id="delete" disabled={!this.room || this.room?.id === "@new"}
            onClick={() => this.deleteRoom()} >
            <md-icon slot="icon">delete</md-icon>
            Delete
          </md-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.editorClosed.emit("cancel")}>
            Cancel
          </md-outlined-button>
          <md-filled-button id="confirm" disabled={!this.isValid}
            onClick={() => this.updateRoom()}
          >
            <md-icon slot="icon">save</md-icon>
            Save
          </md-filled-button>
        </div>
      </Host>
    );
  }

  private handleInputEvent(ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    // check validity of elements
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
      const element = this.formElement.children[i]
      if ("reportValidity" in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.isValid &&= valid;
      }
    }

    return target.value
  }

  private async updateRoom() {
    try {
      const api = RoomsListApiFactory(undefined, this.apiBase);
      const response
        = this.roomId === "@new"
          ? await api.createRoomEntry(this.buildingId, this.room)
          : await api.updateRoomEntry(this.buildingId, this.roomId, this.room);

      if (response.status < 299) {
        this.editorClosed.emit("store")
      } else {
        this.errorMessage = `Cannot store room: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot store room: ${err.message || "unknown"}`
    }
  }

  private async deleteRoom() {
    try {
      console.log(this.buildingId, this.roomId)
      const response = await RoomsListApiFactory(undefined, this.apiBase).deleteRoomEntry(this.buildingId, this.roomId)
      if (response.status < 299) {
        this.editorClosed.emit("delete")
      } else {
        this.errorMessage = `Cannot delete room: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot delete room: ${err.message || "unknown"}`
    }
  }

}
