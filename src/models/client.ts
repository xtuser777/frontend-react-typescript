import { isAxiosError } from 'axios';
import axios from '../services/axios';
import { IndividualPerson } from './individual-person';
import { Person } from './person';
import { toast } from 'react-toastify';

export class Client {
  constructor(
    private _id: number = 0,
    private _register: string = '',
    private _type: number = 0,
    private _person: Person = new IndividualPerson(),
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

  get type(): number {
    return this._type;
  }
  set type(v: number) {
    this._type = v;
  }

  get person(): Person {
    return this._person;
  }
  set person(v: Person) {
    this._person = v;
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/client/${id}`);
      const client: Client = response.data;

      return client;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/client`);
      const clients: Client[] = response.data;

      return clients;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
