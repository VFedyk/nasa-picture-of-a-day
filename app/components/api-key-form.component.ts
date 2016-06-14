import {Component} from "@angular/core";
import {DataService} from "../services/data.service";

@Component({
    selector: 'api-key-form',
    template: `
        <p>Enter API key:</p>
        <input type="text" [(ngModel)]="apiKey">
        <button (click)="saveApiKey()">Submit</button>
    `
})
export class ApiKeyFormComponent {
    apiKey: string;
    
    constructor(private _data: DataService) {}

    saveApiKey() {
        this._data.saveAPIKey(this.apiKey);
    }
}