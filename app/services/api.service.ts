import { Injectable, EventEmitter } from "angular2/core";
import { Http } from "angular2/http";
import { CacheService } from "./cache.service";
import { config } from "../config";

@Injectable()
export class ApiService {
  private url = `https://api.nasa.gov/planetary/apod?api_key=${config.apiKey}`;
  private _loadDone = new EventEmitter();
  private _picturesLoaded;

  constructor(
    private _http: Http,
    private _cache: CacheService
  ) {}

  loadPicture(dayNumber) {
    let date = new Date();
    date.setTime(dayNumber * 24 * 60 * 60 * 1000);
    let day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let pictureLoaded = new EventEmitter();
    if (this._cache.hasPicture(dayNumber)) {
      setTimeout(() => {pictureLoaded.emit(this._cache.getPicture(dayNumber));}, 0);

    } else {
      this._http.get(`${this.url}&date=${day}`).subscribe(response => {
        this._cache.savePictureInfo(dayNumber, response.json());
        pictureLoaded.emit(this._cache.getPicture(dayNumber));
      })
    }
    return pictureLoaded;
  }

  loadPictures(count, startDate) {
    this._picturesLoaded = [];
    for (let i = 0; i < count; i++) {
      let dayNumber = startDate - i;
      this.loadPicture(dayNumber).subscribe(picture => {
        picture.day = dayNumber;
        this._picturesLoaded.push(picture);
        if (this._picturesLoaded.length == count) {
          this._picturesLoaded.sort((a, b) => b.day - a.day);
          this._loadDone.emit(this._picturesLoaded);
        }
      });
    }

    return this._loadDone;
  }
}
