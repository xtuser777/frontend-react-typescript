import { Product } from './Product';
import { SaleBudget } from './SaleBudget';

interface ISaleBudgetItem {
  id: number;
  budget: SaleBudget;
  product: Product;
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

  get budget(): SaleBudget {
    return this.attributes.budget;
  }
  set budget(v: SaleBudget) {
    this.attributes.budget = v;
  }

  get product(): Product {
    return this.attributes.product;
  }
  set product(v: Product) {
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
