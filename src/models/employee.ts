import { IndividualPerson } from './individual-person';
import { Person } from './person';

export class Employee {
  constructor(
    private _id: number = 0,
    private _type: number = 0,
    private _admission: string = '',
    private _demission: string | undefined = undefined,
    private _person: Person = new IndividualPerson(),
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

  get admission(): string {
    return this._admission;
  }
  set admission(v: string) {
    this._admission = v;
  }

  get demission(): string | undefined {
    return this._demission;
  }
  set demission(v: string | undefined) {
    this._demission = v;
  }

  get person(): Person {
    return this._person;
  }
  set person(v: Person) {
    this._person = v;
  }
}
