import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from "angular2/http";
import {ApiService} from "./services/api.service";
import {CacheService} from "./services/cache.service";
import {PictureBusService} from "./services/picture-bus.service";

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ApiService,
  CacheService,
  PictureBusService
]);
