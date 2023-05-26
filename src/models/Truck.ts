import { Proprietary } from './Proprietary';
import { TruckType } from './truck-type';

export class Truck {
  constructor(
    private id: number = 0,
    private plate: string = '',
    private brand: string = '',
    private model: string = '',
    private color: string = '',
    private manufactureYear: number = 0,
    private modelYear: number = 0,
    private type: TruckType = new TruckType(),
    private proprietary: Proprietary = new Proprietary(),
  ) {}
}
