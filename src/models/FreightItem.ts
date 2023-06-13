import { Product } from '../models/Product';
import { IProduct } from './Product';

export interface IFreightItem {
  id: number;
  product: IProduct;
  quantity: number;
  weight: number;
}

export class FreightItem implements IFreightItem {
  private attributes: IFreightItem;

  constructor(attributes?: IFreightItem) {
    this.attributes = attributes
      ? attributes
      : {
          id: 0,
          product: new Product(),
          quantity: 0,
          weight: 0.0,
        };
  }

  get id(): number {
    return this.attributes.id;
  }
  set id(v: number) {
    this.attributes.id = v;
  }

  get product(): IProduct {
    return this.attributes.product;
  }
  set product(v: IProduct) {
    this.attributes.product = v;
  }

  get quantity(): number {
    return this.attributes.quantity;
  }
  set quantity(v: number) {
    this.attributes.quantity = v;
  }

  get weight(): number {
    return this.attributes.weight;
  }
  set weight(v: number) {
    this.attributes.weight = v;
  }
}
