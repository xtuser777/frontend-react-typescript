import { toast } from 'react-toastify';
import axios from '../services/axios';
import { isAxiosError } from 'axios';

export class TruckType {
  constructor(
    private _id: number = 0,
    private _description: string = '',
    private _axes: number = 0,
    private _capacity: number = 0.0,
  ) {}

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

  get axes(): number {
    return this._axes;
  }
  set axes(v: number) {
    this._axes = v;
  }

  get capacity(): number {
    return this._capacity;
  }
  set capacity(v: number) {
    this._capacity = v;
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/type/${id}`);
      const type: TruckType = response.data;

      return type;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/type`);
      const types: TruckType[] = response.data;

      return types;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
