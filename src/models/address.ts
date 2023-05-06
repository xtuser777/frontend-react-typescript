import { City } from './city';

export class Address {
  constructor(
    private _id: number = 0,
    private _street: string = '',
    private _number: string = '',
    private _neighborhood: string = '',
    private _complement: string = '',
    private _code: string = '',
    private _city: City = new City(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get street(): string {
    return this._street;
  }
  set street(v: string) {
    this._street = v;
  }

  get number(): string {
    return this._number;
  }
  set number(v: string) {
    this._number = v;
  }

  get neighborhood(): string {
    return this._neighborhood;
  }
  set neighborhood(v: string) {
    this._neighborhood = v;
  }

  get complement(): string {
    return this._complement;
  }
  set complement(v: string) {
    this._complement = v;
  }

  get code(): string {
    return this._code;
  }
  set code(v: string) {
    this._code = v;
  }

  get city(): City {
    return this._city;
  }
  set city(v: City) {
    this._city = v;
  }
}
