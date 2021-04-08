import * as mongoose from 'mongoose';

import { RawData } from 'beverage/utils/types';
import { institution, ingredient, place } from 'beverage/utils/aggregation';
import { editorial, label, producer } from 'beverage/utils/project';

const getDashboardDetails = function(id: string): RawData[] {
  return this.aggregate([
    ...institution,
    ...place,
    ...ingredient,
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
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

export default getDashboardDetails;
