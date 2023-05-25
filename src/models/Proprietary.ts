import { toast } from 'react-toastify';
import axios from '../services/axios';
import { Driver } from './driver';
import { Person } from './person';
import { isAxiosError } from 'axios';

export class Proprietary {
  constructor(
    private _id: number = 0,
    private _register: string = '',
    private _driver: Driver | undefined = undefined,
    private _person: Person = new Person(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get register(): string {
    return this._register;
  }
  set register(v: string) {
    this._register = v;
  }

  get driver(): Driver | undefined {
    return this._driver;
  }
  set driver(v: Driver | undefined) {
    this._driver = v;
  }

  get person(): Person {
    return this._person;
  }
  set person(v: Person) {
    this._person = v;
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/proprietary/${id}`);
      const prop: Proprietary = response.data;

      return prop;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/proprietary`);
      const props: Proprietary[] = response.data;

      return props;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
