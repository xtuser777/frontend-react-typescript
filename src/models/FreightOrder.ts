import { ICity, City } from './City';
import { IClient, Client } from './Client';
import { IDriver, Driver } from './Driver';
import { IEmployee, Employee } from './Employee';
import { IFreightBudget } from './FreightBudget';
import { IFreightItem } from './FreightItem';
import { ILoadStep } from './LoadStep';
import { IOrderStatus, OrderStatus } from './OrderStatus';
import { IPaymentForm, PaymentForm } from './PaymentForm';
import { IProprietary, Proprietary } from './Proprietary';
import { IRepresentation } from './Representation';
import { ISaleOrder } from './SaleOrder';
import { ITruck, Truck } from './Truck';
import { ITruckType, TruckType } from './TruckType';

export interface IFreightOrder {
  id: number;
  date: string;
  description: string;
  distance: number;
  weight: number;
  value: number;
  driverValue: number;
  driverEntry: number;
  shipping: string;
  budget?: IFreightBudget;
  saleOrder?: ISaleOrder;
  representation?: IRepresentation;
  client: IClient;
  destiny: ICity;
  truckType: ITruckType;
  proprietary: IProprietary;
  driver: IDriver;
  truck: ITruck;
  status: IOrderStatus;
  paymentFormFreight: IPaymentForm;
  paymentFormDriver: IPaymentForm;
  author: IEmployee;
  items: IFreightItem[];
  steps: ILoadStep[];
}

export class FreightOrder implements IFreightOrder {
  private attributes: IFreightOrder;

  constructor(attributes?: IFreightOrder) {
    this.attributes = attributes
      ? attributes
      : {
          id: 0,
          date: '',
          description: '',
          weight: 0.0,
          value: 0.0,
          shipping: '',
          distance: 0,
          driverValue: 0.0,
          driverEntry: 0.0,
          budget: undefined,
          saleOrder: undefined,
          representation: undefined,
          client: new Client(),
          destiny: new City(),
          driver: new Driver(),
          proprietary: new Proprietary(),
          truckType: new TruckType(),
          truck: new Truck(),
          status: new OrderStatus(),
          paymentFormFreight: new PaymentForm(),
          paymentFormDriver: new PaymentForm(),
          author: new Employee(),
          items: [],
          steps: [],
        };
  }

  get id(): number {
    return this.attributes.id;
  }
  set id(v: number) {
    this.attributes.id = v;
  }

  get date(): string {
    return this.attributes.date;
  }
  set date(v: string) {
    this.attributes.date = v;
  }

  get description(): string {
    return this.attributes.description;
  }
  set description(v: string) {
    this.attributes.description = v;
  }

  get weight(): number {
    return this.attributes.weight;
  }
  set weight(v: number) {
    this.attributes.weight = v;
  }

  get value(): number {
    return this.attributes.value;
  }
  set value(v: number) {
    this.attributes.value = v;
  }

  get distance(): number {
    return this.attributes.distance;
  }
  set distance(v: number) {
    this.attributes.distance = v;
  }

  get shipping(): string {
    return this.attributes.shipping;
  }
  set shipping(v: string) {
    this.attributes.shipping = v;
  }

  get driverValue(): number {
    return this.attributes.driverValue;
  }
  set driverValue(v: number) {
    this.attributes.driverValue = v;
  }

  get driverEntry(): number {
    return this.attributes.driverEntry;
  }
  set driverEntry(v: number) {
    this.attributes.driverEntry = v;
  }

  get budget(): IFreightBudget | undefined {
    return this.attributes.budget;
  }
  set budget(v: IFreightBudget | undefined) {
    this.attributes.budget = v;
  }

  get saleOrder(): ISaleOrder | undefined {
    return this.attributes.saleOrder;
  }
  set saleOrder(v: ISaleOrder | undefined) {
    this.attributes.saleOrder = v;
  }

  get representation(): IRepresentation | undefined {
    return this.attributes.representation;
  }
  set representation(v: IRepresentation | undefined) {
    this.attributes.representation = v;
  }

  get client(): IClient {
    return this.attributes.client;
  }
  set client(v: IClient) {
    this.attributes.client = v;
  }

  get destiny(): ICity {
    return this.attributes.destiny;
  }
  set destiny(v: ICity) {
    this.attributes.destiny = v;
  }

  get driver(): IDriver {
    return this.attributes.driver;
  }
  set driver(v: IDriver) {
    this.attributes.driver = v;
  }

  get proprietary(): IProprietary {
    return this.attributes.proprietary;
  }
  set proprietary(v: IProprietary) {
    this.attributes.proprietary = v;
  }

  get truckType(): ITruckType {
    return this.attributes.truckType;
  }
  set truckType(v: ITruckType) {
    this.attributes.truckType = v;
  }

  get truck(): ITruck {
    return this.attributes.truck;
  }
  set truck(v: ITruck) {
    this.attributes.truck = v;
  }

  get status(): IOrderStatus {
    return this.attributes.status;
  }
  set status(v: IOrderStatus) {
    this.attributes.status = v;
  }

  get paymentFormFreight(): IPaymentForm {
    return this.attributes.paymentFormFreight;
  }
  set paymentFormFreight(v: IPaymentForm) {
    this.attributes.paymentFormFreight = v;
  }

  get paymentFormDriver(): IPaymentForm {
    return this.attributes.paymentFormDriver;
  }
  set paymentFormDriver(v: IPaymentForm) {
    this.attributes.paymentFormDriver = v;
  }

  get author(): IEmployee {
    return this.attributes.author;
  }
  set author(v: IEmployee) {
    this.attributes.author = v;
  }

  get items(): IFreightItem[] {
    return this.attributes.items;
  }
  set items(v: IFreightItem[]) {
    this.attributes.items = v;
  }

  get steps(): ILoadStep[] {
    return this.attributes.steps;
  }
  set steps(v: ILoadStep[]) {
    this.attributes.steps = v;
  }

  get toAttributes(): IFreightOrder {
    const attributes: IFreightOrder = { ...this.attributes };
    return attributes;
  }
}
