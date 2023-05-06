export abstract class Person {
  constructor(protected _id: number = 0) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }
}
