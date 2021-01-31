import { LanguageValue } from 'utils/types';

export type Ingredient = {
  badge: string;
  id: string;
  name: LanguageValue[];
  type: string;
  parent?: string;
};
