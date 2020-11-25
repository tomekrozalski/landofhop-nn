import { LanguageValue } from 'utils/types';
import { IngredientType } from 'beverage/utils/enums';

export type DryHopped = {
  id: string;
  name: LanguageValue[];
  type: IngredientType;
};
