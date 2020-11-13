import { LanguageValue } from 'utils/types';
import {
  AlcoholScope,
  Clarity,
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
  Fermentation,
} from 'beverage/utils/enums';
import {
  Aged,
  Brewing,
  Impressions,
  Ingredient,
  Ingredients,
  Institution,
  Place,
  Price,
} from './fragments';

export type Details = {
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
      place?: Place;
      tale?: LanguageValue[];
      barcode?: string;
    };
    brewing?: Brewing;
    ingredients?: Ingredients;
    impressions?: Impressions;
    container: {
      color: ContainerColor;
      material: ContainerMaterial;
      unit: ContainerUnit;
      type: ContainerType;
      value: number;
      hasCapWireFlip?: boolean;
    };
    price?: Price[];
  };
  producer?: {
    general?: {
      series?: LanguageValue[];
      brand?: Institution;
      cooperation?: Institution[];
      contract?: Institution;
      place?: Place;
      tale?: LanguageValue[];
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
};
