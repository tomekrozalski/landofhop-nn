import { LanguageValue } from 'utils/types';
import {
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  Category,
  ExpirationDateUnit,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
  HopRateUnit,
} from 'beverage/utils/enums';
import { Aged, Ingredient } from '.';

export type Brewing = {
  beverageType?: Category;
  fermentation?: Fermentation[];
  extract?: {
    relate: ExtractRelate;
    unit: ExtractUnit;
    value: number;
  };
  alcohol?: {
    relate: AlcoholRelate;
    unit: AlcoholUnit;
    value: number;
    scope?: AlcoholScope;
  };
  filtration?: boolean;
  pasteurization?: boolean;
  hopRate?: {
    unit: HopRateUnit;
    value: number;
  };
  aged?: Aged[];
  style?: LanguageValue[];
  isDryHopped?: boolean;
  dryHopped?: {
    hops: {
      type: Ingredient[];
    };
  };
  expirationDate?: {
    value: number;
    unit: ExpirationDateUnit;
  };
};
