import {
  AgedPreviousContent,
  AgedTimeUnit,
  AgedType,
  AgedWood,
} from 'beverage/utils/enums';

export type Aged = {
  type?: AgedType;
  wood?: AgedWood;
  time?: {
    value: number;
    unit: AgedTimeUnit;
  };
  previousContent?: AgedPreviousContent[];
};
