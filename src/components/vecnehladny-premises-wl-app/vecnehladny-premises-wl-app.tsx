import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'vecnehladny-premises-wl-app',
  styleUrl: 'vecnehladny-premises-wl-app.css',
  shadow: true,
})
export class VecnehladnyPremisesWlApp {

  @State() private relativePath = "";
  @Prop() basePath: string="";
  @Prop() apiBase: string;
  
  @Prop() buildingId: string;

   componentWillLoad() {
     const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

     const toRelative = (path: string) => {
       if (path.startsWith( baseUri)) {
         this.relativePath = path.slice(baseUri.length)
       } else {
         this.relativePath = ""
       }
     }

     window.navigation?.addEventListener("navigate", (ev: Event) => {
       if ((ev as any).canIntercept) { (ev as any).intercept(); }
       let path = new URL((ev as any).destination.url).pathname;
       toRelative(path);
     });

     toRelative(location.pathname)
   }

  render() {
    let element = "list"
    let roomId = "@new"
  
    if ( this.relativePath.startsWith("room/"))
    {
      element = "editor";
      roomId = this.relativePath.split("/")[1]
    }
  
    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }
  
    return (
      <Host>
        { element === "editor"
        ? <vecnehladny-premises-wl-editor room-id={roomId} building-id={this.buildingId} api-base={this.apiBase} oneditor-closed={ () => navigate("./list")} >
          </vecnehladny-premises-wl-editor>
        : <vecnehladny-premises-wl-list building-id={this.buildingId} room-id={roomId} api-base={this.apiBase} onentry-clicked={ (ev: CustomEvent<string>)=> navigate("./room/" + ev.detail) } ></vecnehladny-premises-wl-list>
        }
  
      </Host>
    );
  }

}
