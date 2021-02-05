import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Ingredient } from 'ingredient/utils/types';

@Injectable()
export class AddNewIngredientService {
  constructor(
    @InjectModel('Ingredient')
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async addNewIngredient({ badge, name, parent, type }): Promise<Ingredient[]> {
    const newIngredient = new this.ingredientModel({
      badge,
      name: name.map(({ lang, value }) => ({
        ...(lang !== 'none' && { language: lang }),
        value,
      })),
      type,
      ...(parent && { parent }),
    });

    await newIngredient.save();

    const updatedIngredients = await this.ingredientModel.getAllIngredients();
    return updatedIngredients;
  }
}
