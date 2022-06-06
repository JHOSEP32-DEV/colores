import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {ColorsService} from "../services/colors.service";
import {catchError} from "rxjs/operators";
import {Color} from "../model/Color";

@Injectable({
  providedIn: 'root'
})
export class ColorResolver implements Resolve<Color> {

  constructor(private colorsService: ColorsService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Color> {
    return this.colorsService.getColor(route.params['colorId']).pipe(catchError(err => {
      this.router.navigate(['/error/404']);
      return throwError(err);
    }));
  }

}
