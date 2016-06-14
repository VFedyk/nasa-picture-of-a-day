import {Component} from "@angular/core";
import {DataService} from "../services/data.service";

@Component({
    selector: 'api-key-form',
    template: `
        <p>First of all you need to obtain NASA API-key. Follow <a href="https://api.nasa.gov/index.html#apply-for-an-api-key" target="_blank">this link</a> and get it.</p>
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
