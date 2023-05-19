import { isAxiosError } from 'axios';
import { Level } from './level';
import { Person } from './person';
import { toast } from 'react-toastify';
import axios from '../services/axios';

export class Employee {
  constructor(
    private _id: number = 0,
    private _type: number = 0,
    private _login: string = '',
    private _password: string | undefined = undefined,
    private _admission: string = '',
    private _demission: string | undefined = undefined,
    private _person: Person = new Person(),
    private _level: Level = new Level(),
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

  get login(): string {
    return this._login;
  }
  set login(v: string) {
    this._login = v;
  }

  get password(): string | undefined {
    return this._password;
  }
  set password(v: string | undefined) {
    this._password = v;
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

  get level(): Level {
    return this._level;
  }
  set level(v: Level) {
    this._level = v;
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/employee/${id}`);
      const user: Employee = response.data;

      return user;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/employee`);
      const users: Employee[] = response.data;

      return users;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
