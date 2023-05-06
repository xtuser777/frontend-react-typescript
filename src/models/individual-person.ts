import { Contact } from './contact';
import { Person } from './person';

export class IndividualPerson extends Person {
  constructor(
    protected _id: number = 0,
    private _name: string = '',
    private _rg: string = '',
    private _cpf: string = '',
    private _birthDate: string = '',
    private _contact: Contact = new Contact(),
  ) {
    super(_id);
  }

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get name(): string {
    return this._name;
  }
  set name(v: string) {
    this._name = v;
  }

  get rg(): string {
    return this._rg;
  }
  set rg(v: string) {
    this._rg = v;
  }

  get cpf(): string {
    return this._cpf;
  }
  set cpf(v: string) {
    this._cpf = v;
  }

  get birthDate(): string {
    return this._birthDate;
  }
  set birthDate(v: string) {
    this._birthDate = v;
  }

  get contact(): Contact {
    return this._contact;
  }
  set contact(v: Contact) {
    this._contact = v;
  }
}
