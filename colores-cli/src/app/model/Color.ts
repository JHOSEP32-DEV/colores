export class Color {
  private _id: number | null;
  private _name: string | null;
  private _color: string | null;
  private _pantone: string | null;
  private _period: number | null;

  constructor(id: number | null, name: string | null, color: string | null, pantone: string | null, period: number | null) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._pantone = pantone;
    this._period = period;
  }

  get id(): number | null {
    return this._id;
  }

  set id(value: number | null) {
    this._id = value;
  }

  get name(): string | null {
    return this._name;
  }

  set name(value: string | null) {
    this._name = value;
  }

  get color(): string | null {
    return this._color;
  }

  set color(value: string | null) {
    this._color = value;
  }

  get pantone(): string | null {
    return this._pantone;
  }

  set pantone(value: string | null) {
    this._pantone = value;
  }

  get period(): number | null {
    return this._period;
  }

  set period(value: number | null) {
    this._period = value;
  }
}
