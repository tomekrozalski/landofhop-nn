import * as mongoose from 'mongoose';

import { languages } from 'utils/aggregation';
import { institution } from 'beverage/utils/aggregation';
import { RawData } from './rawData.type';

const getNextBasics = function(id: string): RawData[] {
  return this.aggregate([
    {
      $match: {
        _id: {
          $gt: mongoose.Types.ObjectId(id),
        },
      },
    },
    { $limit: 1 },
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
  ]);
};

export default getNextBasics;
