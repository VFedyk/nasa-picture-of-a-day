import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class PictureBusService {
  public pictureShow = new EventEmitter;
}
