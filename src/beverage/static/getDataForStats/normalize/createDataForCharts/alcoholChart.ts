import { isNumber, round } from 'lodash';

import { AlcoholChartBar } from 'beverage/utils/types';
import { FormattedBeverage } from '../FormattedBeverage';

const alcoholChart = (values: FormattedBeverage[]): AlcoholChartBar[] => {
  const alcoholValues = values
    .map(({ alcohol }) => {
      const label = alcohol?.label?.value;

      if (isNumber(label)) {
        return label;
      }

      const producer = alcohol?.producer?.value;

      if (isNumber(producer)) {
        return producer;
      }

      return false;
    })
    .filter(val => isNumber(val)) as number[];

  const domain: AlcoholChartBar[] = [];
  const max = Math.max(...alcoholValues) + 1;

  for (let value = 0; value <= max; value = round(value + 0.1, 1)) {
    domain.push({
      beverages: 0,
      value,
    });
  }

  alcoholValues.forEach(alcohol => {
    const match = domain.find(({ value }) => value === alcohol);

    if (match && isNumber(match.beverages)) {
      match.beverages += 1;
    }
  });

  return domain;
};

export default alcoholChart;
