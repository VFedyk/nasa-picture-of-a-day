import {Component, Input} from "angular2/core";
@Component({
  selector: 'picture-item',
  styleUrls: ['./app/components/picture.item.component.css'],
  template: `<div class="picture-item" style="background-image: url('{{getThumbnail()}}'); ">
      <div class="description">
        <p class="title">{{picture.title}}</p>
        <p class="date">{{picture.date}}</p>
      </div>
    </div>
`
})
export class PictureItemCmp {
  @Input('picture') public picture;
  getThumbnail() {
    let cover;
    if (this.picture['media_type'] === 'video') {
      let videoId = this.picture.url.match(/https:\/\/www.youtube.com\/embed\/([A-Za-z0-9\-_]+)\?rel=0/)[1];
      cover = `http://img.youtube.com/vi/${videoId}/0.jpg`;
    } else {
      cover = this.picture.url;
    }

    return cover;
  }
}


