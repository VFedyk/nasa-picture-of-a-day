import { Component, OnInit } from '@angular/core';
import { DomSanitizationService, SafeResourceUrl } from '@angular/platform-browser';
import { PictureBusService } from '../../shared';

@Component({
  selector: 'picture-modal-view',
  templateUrl: 'app/pictures/picture-modal-view/picture-modal-view.component.html'
})
export class PictureModalViewComponent implements OnInit {
  public picture = null;
  public imageLoaded = false;

  constructor(private _bus: PictureBusService, private sanitizer: DomSanitizationService) {
  }

  ngOnInit(): any {
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

  get videoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.picture.url);
  }
}
