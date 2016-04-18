import {Injectable, EventEmitter} from "angular2/core";
@Injectable()
export class PictureBusService {
  public pictureShow = new EventEmitter;
}
