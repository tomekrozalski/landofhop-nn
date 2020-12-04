import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import BeverageSchema from './utils/schema';
import LanguageSchema from 'language/language.schema';

// import {
//   AddNewBeverageController,
//   AddNewBeverageService,
//   GetDetailsController,
//   GetDetailsService,
//   GetImagesDataController,
//   GetImagesDataService,
//   GetLastTilesController,
//   GetLastTilesService,
//   RemoveBeverageController,
//   RemoveBeverageService,
//   UpdateBeverageController,
//   UpdateBeverageService,
// } from './admin';
import {
  GetBasicsController,
  GetBasicsService,
  GetDataForStatsController,
  GetDataForStatsService,
  GetDetailsController,
  GetDetailsService,
  GetTotalController,
  GetTotalService,
} from './static';

import { GetCodesController, GetCodesService } from 'language/getCodes';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Language', schema: LanguageSchema }]),
    MongooseModule.forFeature([{ name: 'Beverage', schema: BeverageSchema }]),
  ],
  controllers: [
    GetCodesController,
    GetBasicsController,
    GetDataForStatsController,
    GetDetailsController,
    GetTotalController,
  ],
  providers: [
    GetCodesService,
    GetBasicsService,
    GetDataForStatsService,
    GetDetailsService,
    GetTotalService,
  ],
})
export class BeverageModule {}
