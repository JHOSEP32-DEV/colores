import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "./session.service";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {User} from "../model/User";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {SessionData} from "../model/SessionData";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$: Observable<User | null>;
  currentUserSubject: BehaviorSubject<User | null>;

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  set currentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  constructor(private httpClient: HttpClient,
              private sessionService: SessionService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(sessionService.getCurrentUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  login(username: string, password: string): Observable<User> {
    return new Observable<User>(subscriber => {
      this.httpClient.post<any>(environment.apiUrl + '/login', {
        username,
        password
      }).subscribe(response => {
        const token = response.token;
        this.httpClient.get<User>(environment.apiUrl + '/user', {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': 'http://localhost:4200'
          })
        }).subscribe(user => {
          this.sessionService.saveSessionData(new SessionData(user, token));
          this.currentUser = user;
          subscriber.next(user);
        }, error => {
          HttpService.handleError(error);
          subscriber.error(error);
        });
      }, error => {
        HttpService.handleError(error);
        subscriber.error(error);
      });
    });
  }

  logout() {
    this.currentUser = null;
    this.sessionService.clearSessionData();
  }

}
