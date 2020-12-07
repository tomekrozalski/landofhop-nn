import { add, format, isBefore, max, min } from 'date-fns';

import { LanguageValue } from 'utils/types';
import { TopBrandsTimeline } from 'beverage/utils/types/DataForStats';
import { FormattedBeverage } from '../FormattedBeverage';

type Props = {
  limit: number;
  values: FormattedBeverage[];
};

const getTopBrands = ({ limit, values }: Props) => {
  type AccType = {
    [name: string]: {
      amount: number;
      id: string;
      name: LanguageValue;
    };
  };

  const accumulator = values.reduce(
    (acc: AccType, { brand }) => ({
      ...acc,
      [brand.id]: {
        ...brand,
        amount: acc[brand.id] ? acc[brand.id].amount + 1 : 1,
      },
    }),
    {},
  );

  return Object.values(accumulator)
    .sort((a, b) => (a.amount < b.amount ? 1 : -1))
    .slice(0, limit);
};

const topBrandsTimeline = ({ limit, values }: Props): TopBrandsTimeline[] => {
  const domain: TopBrandsTimeline[] = [];
  const dates = values.map(({ added }) => new Date(added));
  const earliest = min(dates);
  const latest = max(dates);
  const endpoint = new Date(
    `${format(add(latest, { months: 1 }), 'yyyy-MM')}-01`,
  );
  let current = earliest;

  const topBrands = getTopBrands({ limit, values });

  do {
    domain.push({
      date: format(current, 'yyyy-MM'),
      brands: topBrands.map(props => ({
        ...props,
        amount: 0,
      })),
    });

    current = add(current, { months: 1 });
  } while (isBefore(current, endpoint));

  values.forEach(({ added, brand }) => {
    if (!topBrands.map(({ id }) => id).includes(brand.id)) {
      return false;
    }

    const index = domain.findIndex(
      ({ date }) => date === format(new Date(added), 'yyyy-MM'),
    );

    for (let i = index; i < domain.length; i += 1) {
      const selectedBrand = domain[i].brands.find(({ id }) => id === brand.id);
      selectedBrand!.amount += 1;
    }

    return true;
  });

  return domain;
};

export default topBrandsTimeline;
