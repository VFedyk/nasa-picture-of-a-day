import {Component, Input, OnInit} from "@angular/core";
@Component({
  selector: 'picture-item',
  styleUrls: ['./app/components/picture.item.component.css'],
  template: `
    <div class="picture-item" [ngStyle]="background()">
      <div *ngIf="picture.media_type == 'video'" class="video"></div>
      <div class="description">
        <p class="title">{{picture.title}}</p>
        <p class="date">{{picture.date}}</p>
      </div>
    </div>
`
})
export class PictureItemCmp{
  @Input('picture') public picture;

  background() {
    return {
      'background-image': `url(${this.picture.thumbnail})`
    }
  }
}


