// import { LanguageValue } from 'utils/types';
// import {
//   ContainerType,
//   Fermentation,
//   ExtractUnit,
//   ExtractRelate,
//   AlcoholRelate,
//   AlcoholUnit,
//   AlcoholScope,
// } from 'beverage/utils/enums';

import { AddTimeline } from './AddTimeline';
import { Alcohol } from './Alcohol';
import { FermentationTimeline } from './FermentationTimeline';
import { TopBrandsTimeline } from './TopBrandsTimeline';

export type DataForStats = {
  addTimelineData: AddTimeline[];
  alcoholChartData: Alcohol[];
  fermentationTimelineData: FermentationTimeline[];
  topBrandsTimelineData: TopBrandsTimeline[];
};
