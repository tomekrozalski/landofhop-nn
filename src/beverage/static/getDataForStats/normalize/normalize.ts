import {
  AddTimeline,
  Alcohol,
  DataForStats,
  FermentationTimeline,
  TopBrandsTimeline,
} from 'beverage/utils/types/DataForStats';
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

const normalize = ({ language, languageList, values }: Props): DataForStats => {
  const formattedValues: FormattedBeverage[] = values.map(
    formatBeverageData({ language, languageList }),
  );

  const addTimelineData: AddTimeline[] = addTimeline(formattedValues);
  const alcoholChartData: Alcohol[] = alcoholChart(formattedValues);
  const fermentationTimelineData: FermentationTimeline[] = fermentationTimeline(
    formattedValues,
  );
  const topBrandsTimelineData: TopBrandsTimeline[] = topBrandsTimeline({
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
