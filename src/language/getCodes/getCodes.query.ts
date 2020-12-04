import { Code } from './code.d';

const getCodesQuery = function(): Code[] {
  return this.aggregate([
    {
      $project: {
        _id: 0,
        code: 1,
        id: '$_id',
      },
    },
  ]);
};

export default getCodesQuery;
