import { Code } from 'language/getCodes/code';
import { RawData } from '../rawData.d';
import formatBeverageData from './formatBeverageData';
import { addTimeline } from './createDataForCharts';

type Props = {
  language: string;
  languageList: Code[];
  values: RawData[];
};

const normalize = ({ language, languageList, values }: Props) => {
  const formattedValues = values.map(
    formatBeverageData({ language, languageList }),
  );

  const a = addTimeline(formattedValues);

  return { a, formattedValues };
};

export default normalize;
