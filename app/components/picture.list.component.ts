import {Component, OnInit} from "angular2/core";
import {PictureItemCmp} from "./picture.item.component";
import {Http} from "angular2/http";
import {ApiService} from "../services/api.service";
import {PictureBusService} from "../services/picture-bus.service";
@Component({
  selector: 'picture-list',
  template: `<picture-item *ngFor="#picture of pictures" [picture]="picture" (click)="showModal(picture)"></picture-item>`,
  directives: [PictureItemCmp]
})
export class PictureListCmp implements OnInit{
  public pictures = [];

  constructor(
    private _api: ApiService,
    private _bus: PictureBusService
  ) {}

  showModal(picture) {
    this._bus.pictureShow.emit(picture);
  }

  ngOnInit():any {
    console.log('list init');
    this._api.loadPictures(50).subscribe(pictures => {
      this.pictures = pictures;
    });
  }
}
