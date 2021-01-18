import { Place } from 'place/utils/types';

const getAllPlaces = function(): Place[] {
  return this.aggregate([
    {
      $lookup: {
        from: 'countries',
        localField: 'country',
        foreignField: '_id',
        as: 'country_info',
      },
    },
    {
      $unwind: {
        path: '$country_info',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'institutions',
        localField: 'institution',
        foreignField: '_id',
        as: 'institution_info',
      },
    },
    {
      $unwind: {
        path: '$institution_info',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0,
        city: 1,
        coordinates: '$location.coordinates',
        country: '$country_info.name',
        id: '$_id',
        institution: '$institution_info.name',
      },
    },
    {
      $sort: { 'city.value': 1 },
    },
  ]);
};

export default getAllPlaces;
