import {Component, OnInit} from "angular2/core";
import {PictureItemCmp} from "./picture.item.component";
import {ApiService} from "../services/api.service";
import {PictureBusService} from "../services/picture-bus.service";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'picture-list',
  template: `<picture-item *ngFor="#picture of pictures" [picture]="picture" (click)="showModal(picture)"></picture-item>`,
  directives: [PictureItemCmp],
  host: {"(window:scroll)": "scroll$.next($event)"}
})
export class PictureListCmp implements OnInit{
  public pictures = [];
  public lastPictureDay;
  private lastRequestedDay = 0;
  private isRequestInProcess;
  public scroll$ = new Subject();

  constructor(
    private _api: ApiService,
    private _bus: PictureBusService
  ) {}

  showModal(picture) {
    this._bus.pictureShow.emit(picture);
  }

  ngOnInit():any {
    let startDate = Math.floor((new Date()).getTime() / 1000 / 60 /60 /24);

    this._api.loadPictures(50, startDate).subscribe(pictures => {
      pictures.forEach(picture => this.pictures.push(picture));
      this.lastPictureDay = pictures[pictures.length - 1].day;
    });
    this.scroll$.debounceTime(100).subscribe(v => this.onscroll(v));
  }

  onscroll(event) {
    var distanceFromBottom = document.documentElement.offsetHeight - (window.pageYOffset + window.innerHeight);
    var allowedDistanceFromBottom = 100;
    if (distanceFromBottom <= allowedDistanceFromBottom) {
      this.lastRequestedDay = this.lastPictureDay - 1;
      this._api.loadPictures(10, this.lastPictureDay - 1);
    }
  }
}
