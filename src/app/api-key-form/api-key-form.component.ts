import { Component } from '@angular/core';
import { DataService } from '../shared';

@Component({
  selector: 'api-key-form',
  templateUrl: 'app/api-key-form/api-key-form.component.html'
})
export class ApiKeyFormComponent {
  apiKey: string;

  constructor(private _data: DataService) {
  }

  saveApiKey() {
    this._data.saveAPIKey(this.apiKey);
  }
}
