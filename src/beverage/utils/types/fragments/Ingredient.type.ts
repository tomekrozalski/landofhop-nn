import { LanguageValue } from 'utils/types';
import { IngredientType } from 'beverage/utils/enums';

export type Ingredient = {
  badge: string;
  name: LanguageValue[];
  type: IngredientType;
};
