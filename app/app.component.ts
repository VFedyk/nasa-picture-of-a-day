import {Component} from '@angular/core';
import {PictureListCmp} from "./components/picture.list.component";
import {ModalViewComponent} from "./components/modal-view.component";

@Component({
    selector: 'my-app',
    template: `<h1>NASA's Picture of the day</h1>
    <picture-list></picture-list>
    <modal-view></modal-view>
`,
    directives: [PictureListCmp, ModalViewComponent]
})
export class AppComponent { }
