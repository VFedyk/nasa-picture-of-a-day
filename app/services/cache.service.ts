import {Injectable} from "@angular/core";
@Injectable()
export class CacheService {
  private _ls = window.localStorage;

  hasPicture(day: string) {
    return (this._ls.getItem(`picture_${day}`)) ? true : false;
  }

  getPicture(day) {
    return JSON.parse(this._ls.getItem(`picture_${day}`));
  }

  savePictureInfo(day, info) {
    this._ls.setItem(`picture_${day}`, JSON.stringify(info));
  }
}
