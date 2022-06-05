import {User} from "./User";

export class SessionData {
  private _user: User;
  private _token: string;

  constructor(user: User, token: string) {
    this._user = user;
    this._token = token;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
