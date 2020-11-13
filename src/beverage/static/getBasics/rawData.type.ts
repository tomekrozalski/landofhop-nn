import { LanguageValue } from 'utils/types';
import { ContainerType } from 'beverage/utils/enums';
import { Language } from 'beverage/utils/types/fragments';

export type RawData = {
  id: string;
  shortId: string;
  badge: string;
  brand: {
    badge: string;
    name: LanguageValue[];
  };
  name: LanguageValue[];
  photos?: {
    cover?: {
      height: number;
      width: number;
    };
    outlines?: {
      cover?: string;
    };
  };
  container: {
    type: ContainerType;
  };
  added: Date;
  languages: Language[];
};
