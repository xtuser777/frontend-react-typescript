export class BankData {
  constructor(
    private _id: number = 0,
    private _bank: string = '',
    private _agency: string = '',
    private _account: string = '',
    private _type: number = 0,
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get bank(): string {
    return this._bank;
  }
  set bank(v: string) {
    this._bank = v;
  }

  get agency(): string {
    return this._agency;
  }
  set agency(v: string) {
    this._agency = v;
  }

  get account(): string {
    return this._account;
  }
  set account(v: string) {
    this._account = v;
  }

  get type(): number {
    return this._type;
  }
  set type(v: number) {
    this._type = v;
  }
}
