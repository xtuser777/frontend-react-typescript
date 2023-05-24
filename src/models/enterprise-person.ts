export class EnterprisePerson {
  constructor(
    protected _id: number = 0,
    private _corporateName: string = '',
    private _fantasyName: string = '',
    private _cnpj: string = '',
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get corporateName(): string {
    return this._corporateName;
  }
  set corporateName(v: string) {
    this._corporateName = v;
  }

  get fantasyName(): string {
    return this._fantasyName;
  }
  set fantasyName(v: string) {
    this._fantasyName = v;
  }

  get cnpj(): string {
    return this._cnpj;
  }
  set cnpj(v: string) {
    this._cnpj = v;
  }
}
