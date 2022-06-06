import {Injectable} from '@angular/core';
import {SessionData} from '../model/SessionData';
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private LS_SESSION_DATA = 'sessionData';

  constructor() {
  }

  getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const sData = this.getSessionData();
      if (sData) {
        return sData.user;
      }
    }

    return null;
  }

  isLoggedIn(): boolean {
    return this.getSessionData() !== null;
  }

  saveSessionData(sessionData: SessionData) {
    localStorage.setItem(this.LS_SESSION_DATA, JSON.stringify(sessionData));
  }

  getSessionData(): SessionData | null {
    const lsData = localStorage.getItem(this.LS_SESSION_DATA);
    if (!lsData) {
      return null;
    }

    const json = JSON.parse(lsData);

    // Debido a lo estricto que esta angular debo hacer esto manualmente, normalmente deberia bastar con el JSON.parse(lsData)
    return new SessionData(new User(json._user.id, json._user.name, json._user.username, json._user.roles), json._token);
  }

  clearSessionData() {
    localStorage.removeItem(this.LS_SESSION_DATA);
  }

}
