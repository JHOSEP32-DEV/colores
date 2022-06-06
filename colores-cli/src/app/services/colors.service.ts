import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Color} from "../model/Color";
import {Pagination} from "../model/Pagination";

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private httpService: HttpService) {
  }

  getColors(page?: number):Observable<Pagination<Color>> {
    if (!page) {
      page = 0;
    }

    return this.httpService.createGet('/colors?page=' + page);
  }

  getColor(colorId: number):Observable<Color> {
    return this.httpService.createGet('/colors/' + colorId);
  }

  saveColor(color: Color): Observable<Color> {
    let body = {
      id: color.id,
      name: color.name,
      color: color.color,
      pantone: color.pantone,
      period: color.period
    };

    if (color.id) { // Update
      return this.httpService.createPut('/colors/' + color.id, body);
    } else { // Create
      return this.httpService.createPost('/colors', body);
    }
  }

  deleteColor(colorId: number | null):Observable<any> {
    return this.httpService.createDelete('/colors/' + colorId);
  }

}
