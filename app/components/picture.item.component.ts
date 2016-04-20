import {Component, Input} from "angular2/core";
@Component({
  selector: 'picture-item',
  styleUrls: ['./app/components/picture.item.component.css'],
  template: `<div class="picture-item" style="background-image: url('{{picture.thumbnail}}'); ">
      <div *ngIf="picture.media_type == 'video'" class="video"></div>
      <div class="description">
        <p class="title">{{picture.title}}</p>
        <p class="date">{{picture.date}}</p>
      </div>
    </div>
`
})
export class PictureItemCmp {
  @Input('picture') public picture;
}


