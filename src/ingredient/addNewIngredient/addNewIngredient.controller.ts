import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Ingredient } from 'ingredient/utils/types';
import { AddNewIngredientService } from './addNewIngredient.service';

@Controller('ingredient')
export class AddNewIngredientController {
  constructor(private readonly ingredientService: AddNewIngredientService) {}

  @Post()
  @UseGuards(AuthGuard)
  async saveLanguage(
    @Body('badge') badge: string,
    @Body('name')
    name: {
      lang: string;
      value: string;
    }[],
    @Body('type') type: string,
    @Body('parent') parent: string,
  ) {
    const result: Ingredient[] = await this.ingredientService.addNewIngredient({
      badge,
      name,
      type,
      parent,
    });

    return result;
  }
}
