import { Language } from 'language/utils/types';

const getAllLanguagesQuery = function(): Language[] {
  return this.aggregate([
    {
      $project: {
        _id: 0,
        code: 1,
        id: '$_id',
        name: 1,
      },
    },
  ]);
};

export default getAllLanguagesQuery;
