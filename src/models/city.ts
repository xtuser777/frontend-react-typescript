import { State } from './state';

export class City {
  constructor(
    private _id: number = 0,
    private _name: string = '',
    private _state: State = new State(),
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

  get state(): State {
    return this._state;
  }
  set state(v: State) {
    this._state = v;
  }
}
