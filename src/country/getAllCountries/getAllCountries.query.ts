import { Country } from 'country/utils/types';

const getAllCountriesQuery = function(): Country[] {
  return this.aggregate([
    {
      $project: {
        _id: 0,
        code: 1,
        id: '$_id',
        name: 1,
      },
    },
    {
      $sort: { code: 1 },
    },
  ]);
};

export default getAllCountriesQuery;
