import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Ingredient } from 'ingredient/utils/types';
import { GetAllIngredientsService } from './getAllIngredients.service';

@Controller('ingredient')
export class GetAllIngredientsController {
  constructor(private readonly ingredientService: GetAllIngredientsService) {}

  @Get('getAll')
  @UseGuards(AuthGuard)
  async getAllIngredients() {
    const ingredients: Ingredient[] = await this.ingredientService.getAllIngredients();
    return ingredients;
  }
}
