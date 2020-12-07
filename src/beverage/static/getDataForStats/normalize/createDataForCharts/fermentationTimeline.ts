import { add, format, isBefore, max, min } from 'date-fns';

import { Fermentation as FermentationEnum } from 'beverage/utils/enums';
import { FermentationTimeline } from 'beverage/utils/types/DataForStats';
import { FormattedBeverage } from '../FormattedBeverage';

const addTimeline = (values: FormattedBeverage[]): FermentationTimeline[] => {
  const domain: FermentationTimeline[] = [];
  const dates = values.map(({ added }) => new Date(added));
  const earliest = min(dates);
  const latest = max(dates);
  const endpoint = new Date(
    `${format(add(latest, { months: 1 }), 'yyyy-MM')}-01`,
  );
  let current = earliest;

  do {
    domain.push({
      date: format(current, 'yyyy-MM'),
      [FermentationEnum.top]: 0,
      [FermentationEnum.bottom]: 0,
      [FermentationEnum.spontaneous]: 0,
    });

    current = add(current, { months: 1 });
  } while (isBefore(current, endpoint));

  values.forEach(({ added, fermentation }) => {
    const index = domain.findIndex(
      ({ date }) => date === format(new Date(added), 'yyyy-MM'),
    );

    if (!fermentation) {
      return false;
    }

    const collectedValues = Object.values(fermentation)
      .flat()
      .filter(value => value);

    if (collectedValues.includes(FermentationEnum.top)) {
      domain[index][FermentationEnum.top] += 1;
    }

    if (collectedValues.includes(FermentationEnum.bottom)) {
      domain[index][FermentationEnum.bottom] += 1;
    }

    if (collectedValues.includes(FermentationEnum.spontaneous)) {
      domain[index][FermentationEnum.spontaneous] += 1;
    }
  });

  return domain;
};

export default addTimeline;
