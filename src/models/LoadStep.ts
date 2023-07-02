import { FreightOrder, IFreightOrder } from './FreightOrder';
import { IRepresentation, Representation } from './Representation';

export interface ILoadStep {
  id: number;
  order: number;
  status: number;
  load: number;
  freightOrder: IFreightOrder;
  representation: IRepresentation;
}

export class LoadStep implements ILoadStep {
  private attributes: ILoadStep;

  constructor(attributes?: ILoadStep) {
    this.attributes = attributes
      ? attributes
      : {
          id: 0,
          order: 0,
          load: 0.0,
          status: 0,
          freightOrder: new FreightOrder(),
          representation: new Representation(),
        };
  }

  get id(): number {
    return this.attributes.id;
  }
  set id(v: number) {
    this.attributes.id = v;
  }
  get order(): number {
    return this.attributes.order;
  }
  set order(v: number) {
    this.attributes.order = v;
  }
  get status(): number {
    return this.attributes.status;
  }
  set status(v: number) {
    this.attributes.status = v;
  }
  get load(): number {
    return this.attributes.load;
  }
  set load(v: number) {
    this.attributes.load = v;
  }
  get freightOrder(): IFreightOrder {
    return this.attributes.freightOrder;
  }
  set orfreightOrderder(v: IFreightOrder) {
    this.attributes.freightOrder = v;
  }
  get representation(): IRepresentation {
    return this.attributes.representation;
  }
  set representation(v: IRepresentation) {
    this.attributes.representation = v;
  }

  get toAttributes(): ILoadStep {
    const attributes: ILoadStep = { ...this.attributes };
    return attributes;
  }
}
