import { FreightOrder, IFreightOrder } from './FreightOrder';
import { IRepresentation, Representation } from './Representation';

export interface ILoadStep {
  id: number;
  status: number;
  load: number;
  order: IFreightOrder;
  representation: IRepresentation;
}

export class LoadStep implements ILoadStep {
  private attributes: ILoadStep;

  constructor(attributes?: ILoadStep) {
    this.attributes = attributes
      ? attributes
      : {
          id: 0,
          load: 0.0,
          status: 0,
          order: new FreightOrder(),
          representation: new Representation(),
        };
  }
  get id(): number {
    return this.attributes.id;
  }
  set id(v: number) {
    this.attributes.id = v;
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
  get order(): IFreightOrder {
    return this.attributes.order;
  }
  set order(v: IFreightOrder) {
    this.attributes.order = v;
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
