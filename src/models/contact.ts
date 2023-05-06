import { Address } from './address';

export class Contact {
  constructor(
    private _id: number = 0,
    private _phone: string = '',
    private _cellphone: string = '',
    private _email: string = '',
    private _address: Address = new Address(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get phone(): string {
    return this._phone;
  }
  set phone(v: string) {
    this._phone = v;
  }

  get cellphone(): string {
    return this._cellphone;
  }
  set cellphone(v: string) {
    this._cellphone = v;
  }

  get email(): string {
    return this._email;
  }
  set email(v: string) {
    this._email = v;
  }

  get address(): Address {
    return this._address;
  }
  set address(v: Address) {
    this._address = v;
  }
}
