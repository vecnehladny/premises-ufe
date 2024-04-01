import { Component, Host, Prop, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'vecnehladny-premises-wl-editor',
  styleUrl: 'vecnehladny-premises-wl-editor.css',
  shadow: true,
})
export class VecnehladnyPremisesWlEditor {

  @Prop() premiseId: string;
  
  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;
  
  render() {
    return (
      <Host>
        <md-filled-text-field label="Názov" >
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>
 
        <md-filled-text-field label="Registračné číslo priestoru" >
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>
 
        <md-divider></md-divider>
        <div class="actions">
          <md-filled-tonal-button id="delete"
            onClick={() => this.editorClosed.emit("delete")}>
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.editorClosed.emit("cancel")}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm"
            onClick={() => this.editorClosed.emit("store")}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }

}
