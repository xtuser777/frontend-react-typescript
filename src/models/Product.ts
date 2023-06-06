import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../services/axios';
import { Representation } from './Representation';
import { TruckType } from './truck-type';
import { toast } from 'react-toastify';

export class Product {
  constructor(
    private _id: number = 0,
    private _description: string = '',
    private _measure: string = '',
    private _weight: number = 0.0,
    private _price: number = 0.0,
    private _priceOut: number = 0.0,
    private _representation: Representation = new Representation(),
    private _types: TruckType[] = [],
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

  get measure(): string {
    return this._measure;
  }
  set measure(v: string) {
    this._measure = v;
  }

  get weight(): number {
    return this._weight;
  }
  set weight(v: number) {
    this._weight = v;
  }

  get price(): number {
    return this._price;
  }
  set price(v: number) {
    this._price = v;
  }

  get priceOut(): number {
    return this._priceOut;
  }
  set priceOut(v: number) {
    this._priceOut = v;
  }

  get representation(): Representation {
    return this._representation;
  }
  set representation(v: Representation) {
    this._representation = v;
  }

  get types(): TruckType[] {
    return this._types;
  }
  set types(v: TruckType[]) {
    this._types = v;
  }

  save = async () => {
    const payload = {
      product: {
        description: this.description,
        measure: this.measure,
        weight: this.weight,
        price: this.price,
        priceOut: this.priceOut,
        representation: this.representation,
        types: this.types,
      },
    };
    try {
      const response: AxiosRequestConfig = await axios.post('/product', payload);
      if (response.data.length == 0) {
        toast.success('Produto cadastrado com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (e) {
      if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
      return false;
    }
  };

  update = async () => {
    const payload = {
      product: {
        id: this.id,
        description: this.description,
        measure: this.measure,
        weight: this.weight,
        price: this.price,
        priceOut: this.priceOut,
        representation: this.representation,
        types: this.types,
      },
    };
    try {
      const response: AxiosRequestConfig = await axios.put(
        '/product/' + this.id,
        payload,
      );
      if (response.data.length == 0) {
        toast.success('Produto atualizado com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (e) {
      if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
      return false;
    }
  };

  delete = async () => {
    try {
      const response: AxiosRequestConfig = await axios.delete('/product/' + this.id);
      if (response.data.length == 0) {
        toast.success('Produto removido com sucesso!');
        return true;
      } else {
        toast.error(`Erro: ${response.data}`);
        return false;
      }
    } catch (e) {
      if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
      return false;
    }
  };

  getOne = async (id: number) => {
    if (id <= 0) return undefined;
    try {
      const response = await axios.get('/product' + id);
      let data;
      if (response.data) data = response.data;
      else return undefined;
      const product = new Product(
        data.id,
        data.description,
        data.measure,
        data.weight,
        data.price,
        data.priceOut,
        data.representation,
        data.types,
      );

      return product;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return undefined;
    }
  };

  get = async () => {
    try {
      const response = await axios.get('/product');
      const products: Product[] = [];
      for (const data of response.data)
        products.push(
          new Product(
            data.id,
            data.description,
            data.measure,
            data.weight,
            data.price,
            data.priceOut,
            data.representation,
            data.types,
          ),
        );

      return products;
    } catch (err) {
      if (isAxiosError(err)) toast.error('Erro de requisição: ' + err.response?.data);
      return [];
    }
  };
}
