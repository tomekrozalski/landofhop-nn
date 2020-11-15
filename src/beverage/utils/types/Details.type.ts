import { LanguageValue } from 'utils/types';
import {
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  Category,
  Clarity,
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
  ExpirationDateUnit,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
  IngredientType,
  TemperatureUnit,
} from 'beverage/utils/enums';
import { Aged, Institution, Price, Tale } from './fragments';

export type Details = {
  id: string;
  shortId: string;
  badge: string;
  name: LanguageValue[];
  series?: {
    label?: LanguageValue[];
    producer?: LanguageValue[];
  };
  brand: Institution;
  cooperation?: {
    label?: Institution[];
    producer?: Institution[];
    editorial?: Institution[];
  };
  contract?: {
    label?: Institution;
    producer?: Institution;
    editorial?: Institution;
  };
  place?: {
    label?: {
      city: LanguageValue[];
      country: LanguageValue[];
    };
    producer?: {
      city: LanguageValue[];
      country: LanguageValue[];
    };
    editorial?: {
      city: LanguageValue[];
      country: LanguageValue[];
    };
  };
  tale?: {
    label?: Tale[];
    producer?: Tale[];
  };
  barcode?: string;
  beverageType?: {
    label?: Category;
    producer?: Category;
  };
  fermentation?: {
    label?: Fermentation[];
    producer?: Fermentation[];
    editorial?: Fermentation[];
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
  filtration?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  pasteurization?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  isAged?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  aged?: {
    label?: Aged[];
    producer?: Aged[];
    editorial?: Aged[];
  };
  style?: {
    label?: LanguageValue[];
    producer?: LanguageValue[];
    editorial?: LanguageValue[];
  };
  isDryHopped?: {
    label?: boolean;
    producer?: boolean;
    editorial?: boolean;
  };
  dryHopped?: {
    label?: Array<LanguageValue[]>;
    producer?: Array<LanguageValue[]>;
    editorial?: Array<LanguageValue[]>;
  };
  expirationDate?: {
    label?: {
      value: number;
      unit: ExpirationDateUnit;
    };
    producer?: {
      value: number;
      unit: ExpirationDateUnit;
    };
  };
  ingredientsDescription?: {
    label?: {
      complete: boolean;
      language: string;
      value: string;
    }[];
    producer?: {
      complete: boolean;
      language: string;
      value: string;
    }[];
  };
  ingredientsList?: {
    label?: {
      name: LanguageValue[];
      type: IngredientType;
    }[];
    producer?: {
      name: LanguageValue[];
      type: IngredientType;
    }[];
  };
  smokedMalt?: {
    label?: boolean;
    producer?: boolean;
  };
  bitterness?: {
    label?: number;
    producer?: number;
  };
  sweetness?: {
    label?: number;
    producer?: number;
  };
  fullness?: {
    label?: number;
    producer?: number;
  };
  power?: {
    label?: number;
    producer?: number;
  };
  hoppyness?: {
    label?: number;
    producer?: number;
  };
  temperature?: {
    label?: {
      from: number;
      to: number;
      unit: TemperatureUnit;
    };
    producer?: {
      from: number;
      to: number;
      unit: TemperatureUnit;
    };
  };
  color?: {
    editorial?: string;
  };
  clarity?: {
    editorial?: Clarity;
  };
  container: {
    color: ContainerColor;
    material: ContainerMaterial;
    unit: ContainerUnit;
    type: ContainerType;
    value: number;
    hasCapWireFlip?: boolean;
  };
  price?: {
    label?: Price[];
    producer?: Price[];
    editorial?: Price[];
  };
  photos?: {
    cap?: boolean;
    cover?: {
      height: number;
      width: number;
    };
    gallery?: number;
    outlines?: {
      cover?: string;
      gallery?: string;
    };
  };
  notes?: string;
  added: Date;
  updated?: Date;
};
