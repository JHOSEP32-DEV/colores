import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "./session.service";
import {environment} from "../../environments/environment";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient,
              private sessionService: SessionService) {
  }

  // Error handling
  public static handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // El token esta vencido o es invalido, redireccionamos al login,
      // tambien se valida que la ruta no sea el login para que no redireccione cada que falle el logeo
      // Cabe resaltar que esto es debido a que ni el servidor ni el cliente tienen implementado un sistema de refreshToken
      // y por cuestiones de tiempo.
      // De lo contrario este tipo de casos deberia manejarse en un HttpInterceptor
      if (error.status === 401 && !error.url.includes('login')) {
        window.location.href = '/login'; // No se usa el router de angular porque la funcion es estatica
      }
    }
    console.log('HTTP ERROR: ', error, errorMessage);

    return throwError(errorMessage);
  }

  createGet<T>(url: string) {
    return this.httpClient.get<T>(environment.apiUrl + url, {
      headers: this.getHeaders()
    });
  }

  createPost<T>(url: string, data: any) {
    return this.httpClient.post<T>(environment.apiUrl + url, data, {
      headers: this.getHeaders()
    });
  }

  createDelete<T>(url: string) {
    return this.httpClient.delete<T>(environment.apiUrl + url, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    const headers: any = {
      'Content-Type': 'application/json'
    };

    if (this.sessionService.isLoggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.sessionService.getSessionData()?.token;
    }

    return new HttpHeaders(headers);
  }

}
