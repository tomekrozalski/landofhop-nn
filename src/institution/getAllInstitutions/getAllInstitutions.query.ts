import { Institution } from 'institution/utils/types';

const getAllInstitutionsQuery = function(): Institution[] {
  return this.aggregate([
    {
      $lookup: {
        from: 'institutions',
        localField: 'consortium',
        foreignField: '_id',
        as: 'consortium_info',
      },
    },
    {
      $unwind: {
        path: '$consortium_info',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0,
        badge: 1,
        id: '$_id',
        name: 1,
        shortId: 1,
        website: 1,
        consortium: '$consortium_info.name',
      },
    },
    {
      $sort: { badge: 1 },
    },
  ]);
};

export default getAllInstitutionsQuery;
