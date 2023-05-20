import { isAxiosError } from 'axios';
import axios from '../services/axios';
import { Person } from './person';
import { toast } from 'react-toastify';

export class Parameterization {
  constructor(
    private _id: number = 0,
    private _logotype: string = '',
    private _person: Person = new Person(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get logotype(): string {
    return this._logotype;
  }
  set logotype(v: string) {
    this._logotype = v;
  }

  get person(): Person {
    return this._person;
  }
  set person(v: Person) {
    this._person = v;
  }

  async get() {
    try {
      const response = await axios.get(`/parameterization`);
      const parameterization: Parameterization = response.data;

      return parameterization;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }
}
