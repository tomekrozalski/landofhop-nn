import { Fermentation as FermentationEnum } from 'beverage/utils/enums';

export type FermentationTimeline = {
  date: string;
  [FermentationEnum.top]: number;
  [FermentationEnum.bottom]: number;
  [FermentationEnum.spontaneous]: number;
};
