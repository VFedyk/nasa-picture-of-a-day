import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { DataService } from "./data.service";

@Injectable()
export class ApiService {
  private _loadDone = new EventEmitter();
  private _picturesLoaded;

  constructor(
    private _http: Http,
    private _data: DataService
  ) {}

  get url() {
    return `https://api.nasa.gov/planetary/apod?api_key=${this._data.getAPIKey()}`;
  }

  prepareThumbnail(picture) {
    return new Promise(resolve => {
      let cover;
      if (picture['media_type'] === 'video') {

        let matchesYoutubeURL = picture.url.match(/\/\/www.youtube.com\/embed\/([A-Za-z0-9\-_]+)\?/);
        // https://player.vimeo.com/video/128714112?color=ffffff&byline=0&portrait=0
        // http://player.vimeo.com/video/32095756?title=0&byline=0&portrait=0&autoplay=1
        let matchesVimeoURL = picture.url.match(/\/\/player\.vimeo\.com\/video\/([0-9]+)\?/);
        let videoId;
        if (matchesYoutubeURL) {
          videoId = matchesYoutubeURL[1];
          cover = `http://img.youtube.com/vi/${videoId}/0.jpg`;
          picture.url += '&autoplay=1';
        }

        if (matchesVimeoURL) {
          console.log('Vimeo video:', picture.date);
          videoId = matchesVimeoURL[1];
          picture.url += '&autoplay=1';
          this._http.get(`http://vimeo.com/api/v2/video/${videoId}.json`).subscribe(response => {
            let videoInfo = response.json()[0];
            picture.thumbnail = videoInfo['thumbnail_large'];
            resolve(picture);
          });
          return;
        }
      } else {
        cover = picture.url;
      }

      picture.thumbnail = cover;

      resolve(picture);
    });
  }

  loadPicture(dayNumber) {
    let date = new Date();
    date.setTime(dayNumber * 24 * 60 * 60 * 1000);
    let day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let pictureLoaded = new EventEmitter();
    if (this._data.hasPicture(dayNumber)) {
      setTimeout(() => {pictureLoaded.emit(this._data.getPicture(dayNumber));}, 0);

    } else {
      this._http.get(`${this.url}&date=${day}`).subscribe(response => {
        let picture = response.json();
        this.prepareThumbnail(picture).then(ret => {
          this._data.savePictureInfo(dayNumber, ret);
          pictureLoaded.emit(ret);
        });
      }, error => {
        console.log(error);
        let fakeObject = {
          media_type: 'error',
          title: 'Cannot obtain picture',
          url: error.url
        };
        pictureLoaded.emit(fakeObject);
      })
    }
    return pictureLoaded;
  }

  loadPictures(count, startDate) {
    this._picturesLoaded = [];
    for (let i = 0; i < count; i++) {
      let dayNumber = startDate - i;
      let errors = 0;
      this.loadPicture(dayNumber).subscribe(picture => {
        picture.day = dayNumber;
        if (picture.media_type == 'error') {
          errors++;
        } else {
          this._picturesLoaded.push(picture);
        }
        if ((this._picturesLoaded.length + errors) == count) {
          this._picturesLoaded.sort((a, b) => b.day - a.day);
          this._loadDone.emit(this._picturesLoaded);
        }
      });
    }

    return this._loadDone;
  }
}
