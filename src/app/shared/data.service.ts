import { Injectable } from '@angular/core';
@Injectable()
export class DataService {
  private _ls = window.localStorage;

  hasAPIKey() {
    return (this._ls.getItem('api_key')) ? true : false;
  }

  getAPIKey() {
    return this._ls.getItem('api_key');
  }

  saveAPIKey(apiKey) {
    this._ls.setItem('api_key', apiKey);
  }

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
