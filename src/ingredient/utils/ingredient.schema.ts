import * as mongoose from 'mongoose';

import { langValue } from 'utils/schema';
import { getAllIngredientsQuery } from 'ingredient/getAllIngredients';

const ingredientSchema = new mongoose.Schema({
  badge: {
    type: String,
    required: true,
  },
  name: {
    type: [langValue],
    required: true,
  },
  type: {
    type: String,
    enum: ['malt', 'hop', 'yeast', 'appendix'],
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: false,
  },
});

ingredientSchema.statics.getAllIngredients = getAllIngredientsQuery;

export default ingredientSchema;
