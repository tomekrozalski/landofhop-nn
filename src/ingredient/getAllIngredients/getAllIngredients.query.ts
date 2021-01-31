import { Ingredient } from 'ingredient/utils/types';

const getAllIngredients = function(): Ingredient[] {
  return this.aggregate([
    {
      $project: {
        _id: 0,
        id: '$_id',
        badge: 1,
        name: 1,
        type: 1,
        parent: 1,
      },
    },
  ]);
};

export default getAllIngredients;
