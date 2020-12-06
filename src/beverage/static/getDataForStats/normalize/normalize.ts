import { AddTimeline, DataForStats } from 'beverage/utils/types';
import { Code } from 'language/utils/types';
import { RawData } from '../RawData';
import formatBeverageData from './formatBeverageData';
import { addTimeline } from './createDataForCharts';
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

  return { addTimelineData };
};

export default normalize;
