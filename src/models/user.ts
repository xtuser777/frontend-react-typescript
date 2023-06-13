import { toast } from 'react-toastify';
import axios from '../services/axios';
import { Employee } from './Employee';
import { Level } from './Level';
import { isAxiosError } from 'axios';

export class User {
  constructor(
    private _id: number = 0,
    private _login: string = '',
    private _password: string | undefined = undefined,
    private _active: boolean = false,
    private _employee: Employee = new Employee(),
    private _level: Level = new Level(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
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

  get active(): boolean {
    return this._active;
  }
  set active(v: boolean) {
    this._active = v;
  }

  get employee(): Employee {
    return this._employee;
  }
  set employee(v: Employee) {
    this._employee = v;
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
      const user: User = response.data;

      return user;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/employee`);
      const users: User[] = response.data;

      return users;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
