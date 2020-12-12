import { LanguageValue } from 'utils/types';
import {
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  ContainerType,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
} from 'beverage/utils/enums';

export type FormattedBeverage = {
  id: string;
  brand: {
    badge: string;
    id: string;
    name: LanguageValue;
  };
  fermentation?: {
    label?: Fermentation[];
    producer?: Fermentation[];
    editoria?: Fermentation[];
  };
  extract?: {
    label?: {
      relate: ExtractRelate;
      unit: ExtractUnit;
      value: number;
    };
    producer?: {
      relate: ExtractRelate;
      unit: ExtractUnit;
      value: number;
    };
  };
  alcohol?: {
    label?: {
      relate: AlcoholRelate;
      unit: AlcoholUnit;
      value: number;
      scope?: AlcoholScope;
    };
    producer?: {
      relate: AlcoholRelate;
      unit: AlcoholUnit;
      value: number;
      scope?: AlcoholScope;
    };
    editorial?: {
      scope: AlcoholScope;
    };
  };
  container: {
    type: ContainerType;
  };
  added: Date;
};
