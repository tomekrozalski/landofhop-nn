import { Currency } from 'beverage/utils/enums';

export type Price = {
  date: Date;
  value: number;
  currency: Currency;
};
