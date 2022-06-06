import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ColorsService} from "../services/colors.service";
import {Color} from "../model/Color";
import {Pagination} from "../model/Pagination";

@Injectable({
  providedIn: 'root'
})
export class ColorsResolver implements Resolve<Pagination<Color>> {

  constructor(private colorsService: ColorsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pagination<Color>> {
    return this.colorsService.getColors();
  }
}
