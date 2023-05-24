export class IndividualPerson {
  constructor(
    protected _id: number = 0,
    private _name: string = '',
    private _cpf: string = '',
    private _birth: string = '',
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

  get cpf(): string {
    return this._cpf;
  }
  set cpf(v: string) {
    this._cpf = v;
  }

  get birth(): string {
    return this._birth;
  }
  set birth(v: string) {
    this._birth = v;
  }
}
