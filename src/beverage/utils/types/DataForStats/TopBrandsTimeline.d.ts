import { LanguageValue } from 'utils/types';

export type TopBrandsTimeline = {
  date: string;
  brands: {
    amount: number;
    id: string;
    name: LanguageValue;
  }[];
};
