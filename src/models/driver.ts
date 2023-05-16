import { toast } from 'react-toastify';
import axios from '../services/axios';
import { BankData } from './bank-data';
import { IndividualPerson } from './individual-person';
import { isAxiosError } from 'axios';

export class Driver {
  constructor(
    private _id: number = 0,
    private _register: string = '',
    private _cnh: string = '',
    private _person: IndividualPerson = new IndividualPerson(),
    private _bankData: BankData = new BankData(),
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

  get cnh(): string {
    return this._cnh;
  }
  set cnh(v: string) {
    this._cnh = v;
  }

  get person(): IndividualPerson {
    return this._person;
  }
  set person(v: IndividualPerson) {
    this._person = v;
  }

  get bankData(): BankData {
    return this._bankData;
  }
  set bankData(v: BankData) {
    this._bankData = v;
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/driver/${id}`);
      const driver: Driver = response.data;

      return driver;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/driver`);
      const drivers: Driver[] = response.data;

      return drivers;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
