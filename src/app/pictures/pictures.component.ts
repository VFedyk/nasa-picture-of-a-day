import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { Subject } from 'rxjs/Subject';
import { ApiService, PictureBusService } from '../shared';
import { PictureModalViewComponent } from './picture-modal-view/picture-modal-view.component';

@Component({
  selector: 'picture-list',
  templateUrl: 'app/pictures/pictures.component.html',
  host: {'(window:scroll)': 'scroll$.next($event)'},
  directives: [PictureModalViewComponent]
})
export class PicturesComponent implements OnInit {
  public pictures = [];
  public lastPictureDay;
  private lastRequestedDay = 0;
  public scroll$ = new Subject();

  constructor(private _api: ApiService,
              private _bus: PictureBusService) {
  }

  showModal(picture) {
    this._bus.pictureShow.emit(picture);
  }

  ngOnInit(): any {
    let startDate = Math.floor((new Date()).getTime() / 1000 / 60 / 60 / 24);

    this._api.loadPictures(50, startDate).subscribe(pictures => {
      pictures.forEach(picture => this.pictures.push(picture));
      this.lastPictureDay = pictures[pictures.length - 1].day;
    });
    this.scroll$.debounceTime(100).subscribe(v => this.onScroll(v));
  }

  onScroll(event) {
    let distanceFromBottom = document.documentElement.offsetHeight - (window.pageYOffset + window.innerHeight);
    let allowedDistanceFromBottom = 350;
    if (distanceFromBottom <= allowedDistanceFromBottom) {
      this.lastRequestedDay = this.lastPictureDay - 1;
      this._api.loadPictures(10, this.lastPictureDay - 1);
    }
  }
}
