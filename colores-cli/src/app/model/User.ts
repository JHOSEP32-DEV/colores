import {Role} from "./Role";

export class User {
  private _id: number;
  private _name: string;
  private _username: string;
  private _roles: Role[];

  constructor(id: number, name: string, username: string, roles: Role[]) {
    this._id = id;
    this._name = name;
    this._username = username;
    this._roles = roles;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get roles(): Role[] {
    return this._roles;
  }

  set roles(value: Role[]) {
    this._roles = value;
  }
}
