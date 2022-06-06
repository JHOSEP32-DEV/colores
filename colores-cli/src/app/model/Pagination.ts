export class Pagination<T> {
  private _content: T[];
  private _totalPages: number;
  private _totalElements: number;
  private _elementsPerPage: number;
  private _size: number;
  private _pageNumber: number;
  private _first: boolean;
  private _last: boolean;

  constructor(content: T[], totalPages: number, totalElements: number, elementsPerPage: number, size: number, pageNumber: number, first: boolean, last: boolean) {
    this._content = content;
    this._totalPages = totalPages;
    this._totalElements = totalElements;
    this._elementsPerPage = elementsPerPage;
    this._size = size;
    this._pageNumber = pageNumber;
    this._first = first;
    this._last = last;
  }

  get content(): T[] {
    return this._content;
  }

  set content(value: T[]) {
    this._content = value;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get elementsPerPage(): number {
    return this._elementsPerPage;
  }

  set elementsPerPage(value: number) {
    this._elementsPerPage = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(value: number) {
    this._pageNumber = value;
  }

  get first(): boolean {
    return this._first;
  }

  set first(value: boolean) {
    this._first = value;
  }

  get last(): boolean {
    return this._last;
  }

  set last(value: boolean) {
    this._last = value;
  }
}
