import {
  AddTimelineBar,
  AlcoholChartBar,
  FermentationTimelineBar,
  Stats,
  TopBrandsTimelineBar,
} from 'beverage/utils/types';
import { Code } from 'language/utils/types';
import { RawData } from '../RawData';
import formatBeverageData from './formatBeverageData';
import {
  addTimeline,
  alcoholChart,
  fermentationTimeline,
  topBrandsTimeline,
} from './createDataForCharts';
import { FormattedBeverage } from './FormattedBeverage';

type Props = {
  language: string;
  languageList: Code[];
  values: RawData[];
};

const normalize = ({ language, languageList, values }: Props): Stats => {
  const formattedValues: FormattedBeverage[] = values.map(
    formatBeverageData({ language, languageList }),
  );

  const addTimelineData: AddTimelineBar[] = addTimeline(formattedValues);
  const alcoholChartData: AlcoholChartBar[] = alcoholChart(formattedValues);
  const fermentationTimelineData: FermentationTimelineBar[] = fermentationTimeline(
    formattedValues,
  );
  const topBrandsTimelineData: TopBrandsTimelineBar[] = topBrandsTimeline({
    values: formattedValues,
    limit: 10,
  });

  return {
    addTimelineData,
    alcoholChartData,
    fermentationTimelineData,
    topBrandsTimelineData,
  };
};

export default normalize;
