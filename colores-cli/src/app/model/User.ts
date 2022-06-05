export class User {
  private _id: number;
  private _name: string;
  private _username: string;

  constructor(id: number, name: string, username: string) {
    this._id = id;
    this._name = name;
    this._username = username;
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
}
