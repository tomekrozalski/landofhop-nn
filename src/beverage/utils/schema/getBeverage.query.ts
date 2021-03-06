import { RawData } from 'beverage/utils/types';
import { institution, ingredient, place } from 'beverage/utils/aggregation';
import { editorial, label, producer } from 'beverage/utils/project';

type Props = {
  brand: string;
  name: string;
  shortId: string;
};

const getBeverage = function({ shortId, brand, name }: Props): RawData[] {
  return this.aggregate([
    ...institution,
    ...place,
    ...ingredient,
    {
      $match: {
        badge: name,
        'label.general.brand_info.badge': brand,
        shortId: shortId,
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        shortId: 1,
        badge: 1,
        ...{ label },
        ...{ producer },
        ...{ editorial },
        added: 1,
        updated: 1,
      },
    },
  ]);
};

export default getBeverage;
