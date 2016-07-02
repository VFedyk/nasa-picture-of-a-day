import { Component } from '@angular/core';
import { PicturesComponent } from './pictures/';
import { ApiKeyFormComponent } from './api-key-form/api-key-form.component';
import { DataService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [PicturesComponent, ApiKeyFormComponent]
})
export class AppComponent {
  title = 'app works!';

  constructor(private _data: DataService) {}

  isAPIKeyPresent() {
    return this._data.hasAPIKey();
  }
}
