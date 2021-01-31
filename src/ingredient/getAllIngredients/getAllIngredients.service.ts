import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Ingredient } from 'ingredient/utils/types';

@Injectable()
export class GetAllIngredientsService {
  constructor(
    @InjectModel('Ingredient')
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async getAllIngredients() {
    const ingredients: Ingredient[] = await this.ingredientModel.getAllIngredients();
    return ingredients;
  }
}
