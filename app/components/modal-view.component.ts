import {Component, OnInit} from "@angular/core";
import {PictureBusService} from "../services/picture-bus.service";
@Component({
  selector: 'modal-view',
  template: `
    <div class="modal" *ngIf="picture">
      <h2>{{picture.title}}</h2>
      <div class="close-button" (click)="closeModal()"></div>
      <p *ngIf="picture.media_type === 'image' && !imageLoaded" class="preloader"></p>
      <img [src]="picture.hdurl" *ngIf="picture.media_type === 'image' && imageLoaded"/>
      <iframe [src]="picture.url" *ngIf="picture.media_type === 'video'"></iframe>
      <div class="side-desc">
        <p>{{picture.explanation}}</p>
        <p *ngIf="picture.copyright">Author: <strong>{{picture.copyright}}</strong></p>
      </div>
    </div>
`
})
export class ModalViewComponent implements OnInit{
  public picture = null;
  public imageLoaded = false;

  constructor(private _bus: PictureBusService) {}

  ngOnInit():any {
    this._bus.pictureShow.subscribe(picture => {
      if (picture.media_type === 'image') {
        let img = new Image();
        img.src = picture.hdurl;
        img.addEventListener('load', () => {
          this.imageLoaded = true;
        });
      }
      this.picture = picture;
    });
  }

  closeModal() {
    this.picture = null;
    this.imageLoaded = false;
  }
}
