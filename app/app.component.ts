import {Component} from '@angular/core';
import {PictureListCmp} from "./components/picture.list.component";
import {ModalViewComponent} from "./components/modal-view.component";
import {DataService} from "./services/data.service";
import {ApiKeyFormComponent} from "./components/api-key-form.component";

@Component({
    selector: 'my-app',
    template: `<h1>NASA's Picture of the day</h1>
    <picture-list *ngIf="isAPIKeyPresent()"></picture-list>
    <modal-view *ngIf="isAPIKeyPresent()"></modal-view>
    <api-key-form *ngIf="!isAPIKeyPresent()"></api-key-form>
`,
    directives: [PictureListCmp, ModalViewComponent, ApiKeyFormComponent]
})
export class AppComponent {
    constructor(private _data: DataService) {}
    
    isAPIKeyPresent() {
      return this._data.hasAPIKey();
    }
}
