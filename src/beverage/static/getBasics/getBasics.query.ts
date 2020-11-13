import { languages } from 'utils/aggregation';
import { institution } from 'beverage/utils/aggregation';
import { RawData } from './rawData.type';

const getBasics = function({ limit, skip }): RawData[] {
  return this.aggregate([
    ...institution,
    ...languages,
    {
      $project: {
        _id: 0,
        id: '$_id',
        shortId: 1,
        badge: 1,
        brand: {
          badge: '$label.general.brand_info.badge',
          name: '$label.general.brand_info.name',
        },
        name: '$label.general.name',
        photos: {
          cover: {
            height: '$editorial.photos.cover.height',
            width: '$editorial.photos.cover.width',
          },
          outlines: {
            cover: '$editorial.photos.outlines.cover',
          },
        },
        container: {
          type: '$label.container.type',
        },
        added: 1,
        languages: 1,
      },
    },
    { $sort: { added: -1 } },
    { $skip: +skip },
    { $limit: +limit },
  ]);
};

export default getBasics;
