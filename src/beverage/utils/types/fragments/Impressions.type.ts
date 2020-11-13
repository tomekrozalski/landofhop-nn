import { TemperatureUnit } from 'beverage/utils/enums';

export type Impressions = {
  bitterness?: number;
  sweetness?: number;
  fullness?: number;
  power?: number;
  hoppyness?: number;
  temperature?: {
    from: number;
    to: number;
    unit: TemperatureUnit;
  };
};
