import { isAxiosError } from 'axios';
import axios from '../services/axios';
import { Proprietary } from './Proprietary';
import { TruckType } from './truck-type';
import { toast } from 'react-toastify';

export class Truck {
  constructor(
    private _id: number = 0,
    private _plate: string = '',
    private _brand: string = '',
    private _model: string = '',
    private _color: string = '',
    private _manufactureYear: number = 0,
    private _modelYear: number = 0,
    private _type: TruckType = new TruckType(),
    private _proprietary: Proprietary = new Proprietary(),
  ) {}

  get id(): number {
    return this._id;
  }
  set id(v: number) {
    this._id = v;
  }

  get plate(): string {
    return this._plate;
  }
  set plate(v: string) {
    this._plate = v;
  }

  get brand(): string {
    return this._brand;
  }
  set brand(v: string) {
    this._brand = v;
  }

  get model(): string {
    return this._model;
  }
  set model(v: string) {
    this._model = v;
  }

  get color(): string {
    return this._color;
  }
  set color(v: string) {
    this._color = v;
  }

  get manufactureYear(): number {
    return this._manufactureYear;
  }
  set manufactureYear(v: number) {
    this._manufactureYear = v;
  }

  get modelYear(): number {
    return this._modelYear;
  }
  set modelYear(v: number) {
    this._modelYear = v;
  }

  get type(): TruckType {
    return this._type;
  }
  set type(v: TruckType) {
    this._type = v;
  }

  get proprietary(): Proprietary {
    return this._proprietary;
  }
  set proprietary(v: Proprietary) {
    this._proprietary = v;
  }

  async getOne(id: number) {
    try {
      const response = await axios.get(`/truck/${id}`);
      const truck: Truck = response.data;

      return truck;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  }

  async get() {
    try {
      const response = await axios.get(`/truck`);
      const trucks: Truck[] = response.data;

      return trucks;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  }
}
