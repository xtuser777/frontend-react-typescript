export class Level {
  constructor(private _id: number = 0, private _description: string = '') {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get description(): string {
    return this._description;
  }
  set description(v: string) {
    this._description = v;
  }
}
