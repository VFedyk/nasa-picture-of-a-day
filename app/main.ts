import {bootstrap}    from '@angular/platform-browser-dynamic'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from "@angular/http";
import {ApiService} from "./services/api.service";
import {CacheService} from "./services/cache.service";
import {PictureBusService} from "./services/picture-bus.service";

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ApiService,
  CacheService,
  PictureBusService
]);
