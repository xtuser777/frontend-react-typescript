import { EnterprisePerson } from './enterprise-person';
import { IndividualPerson } from './individual-person';

export class Person {
  constructor(
    private _id: number = 0,
    private _type: number = 0,
    private _individual: IndividualPerson | undefined = undefined,
    private _enterprise: EnterprisePerson | undefined = undefined,
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get type(): number {
    return this._type;
  }
  set type(v: number) {
    this._type = v;
  }

  get individual(): IndividualPerson | undefined {
    return this._individual;
  }
  set individual(v: IndividualPerson | undefined) {
    this._individual = v;
  }

  get enterprise(): EnterprisePerson | undefined {
    return this._enterprise;
  }
  set enterprise(v: EnterprisePerson | undefined) {
    this._enterprise = v;
  }
}
