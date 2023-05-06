export class State {
  constructor(
    private _id: number = 0,
    private _name: string = '',
    private _acronym: string = '',
  ) {}

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

  get acronym(): string {
    return this._acronym;
  }
  set acronym(v: string) {
    this._acronym = v;
  }
}
