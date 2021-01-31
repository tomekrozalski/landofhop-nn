import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import IngredientSchema from 'ingredient/utils/ingredient.schema';
import {
  GetAllIngredientsController,
  GetAllIngredientsService,
} from './getAllIngredients';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ingredient', schema: IngredientSchema },
    ]),
  ],
  controllers: [GetAllIngredientsController],
  providers: [GetAllIngredientsService],
})
export class IngredientModule {}
