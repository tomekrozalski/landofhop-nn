import { LanguageValue } from 'utils/types';
import { AlcoholScope, Clarity, Fermentation } from 'beverage/utils/enums';
import {
  Aged,
  Brewing,
  Container,
  Impressions,
  Ingredient,
  Ingredients,
  Institution,
  Language,
  Place,
  Price,
  Tale,
} from './fragments';

export type RawData = {
  id: string;
  shortId: string;
  badge: string;
  label: {
    general: {
      name: LanguageValue[];
      series?: LanguageValue[];
      brand: Institution;
      cooperation?: Institution[];
      contract?: Institution;
      isContract?: boolean;
      place?: Place;
      remark?: LanguageValue[];
      tale?: Tale[];
      barcode?: string;
    };
    brewing?: Brewing;
    ingredients?: Ingredients;
    impressions?: Impressions;
    container: Container;
    price?: Price[];
  };
  producer?: {
    general?: {
      series?: LanguageValue[];
      brand?: Institution;
      cooperation?: Institution[];
      contract?: Institution;
      isContract?: boolean;
      place?: Place;
      remark?: LanguageValue[];
      tale?: Tale[];
    };
    brewing?: Brewing;
    ingredients?: Ingredients;
    impressions?: Impressions;
    price?: Price[];
  };
  editorial?: {
    general?: {
      cooperation?: Institution[];
      contract?: Institution;
      isContract?: boolean;
      place?: Place;
    };
    brewing?: {
      fermentation?: Fermentation[];
      alcohol?: {
        scope?: AlcoholScope;
      };
      filtration?: boolean;
      pasteurization?: boolean;
      aged?: Aged[];
      style?: LanguageValue[];
      isDryHopped?: boolean;
      dryHopped?: {
        hops: {
          type: Ingredient[];
        };
      };
    };
    impressions?: {
      color?: string;
      clarity?: Clarity;
    };
    price?: Price[];
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
  };
  added: Date;
  updated?: Date;
  languages: Language[];
};
