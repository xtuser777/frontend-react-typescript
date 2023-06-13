import { IProduct, Product } from './Product';
import { ISaleBudget, SaleBudget } from './SaleBudget';

export interface ISaleBudgetItem {
  id: number;
  budget: ISaleBudget;
  product: IProduct;
  quantity: number;
  weight: number;
  price: number;
}

export class SaleBudgetItem {
  private attributes: ISaleBudgetItem;

  constructor(attributes?: ISaleBudgetItem) {
    this.attributes = attributes
      ? attributes
      : {
          id: 0,
          budget: new SaleBudget(),
          product: new Product(),
          quantity: 0,
          weight: 0.0,
          price: 0.0,
        };
  }

  get id(): number {
    return this.attributes.id;
  }
  set id(v: number) {
    this.attributes.id = v;
  }

  get budget(): ISaleBudget {
    return this.attributes.budget;
  }
  set budget(v: ISaleBudget) {
    this.attributes.budget = v;
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

  get price(): number {
    return this.attributes.price;
  }
  set price(v: number) {
    this.attributes.price = v;
  }

  get toAttributes(): ISaleBudgetItem {
    const attributes: ISaleBudgetItem = { ...this.attributes };
    return attributes;
  }
}
