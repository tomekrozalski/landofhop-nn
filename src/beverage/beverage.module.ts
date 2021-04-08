import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import BeverageSchema from './utils/schema';
import LanguageSchema from 'language/utils/language.schema';

import {
  AddNewBeverageController,
  AddNewBeverageService,
  GetAdminDetailsController,
  GetAdminDetailsService,
  GetDashboardDetailsController,
  GetDashboardDetailsService,
  //   GetDetailsController,
  //   GetDetailsService,
  //   GetImagesDataController,
  //   GetImagesDataService,
  //   GetLastTilesController,
  //   GetLastTilesService,
  RemoveBeverageController,
  RemoveBeverageService,
  //   UpdateBeverageController,
  //   UpdateBeverageService,
} from './admin';
import { SearchBeverageController, SearchBeverageService } from './dynamic';
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
    AddNewBeverageController,
    GetAdminDetailsController,
    GetCodesController,
    GetBasicsController,
    GetDashboardDetailsController,
    GetDataForStatsController,
    GetDetailsController,
    GetTotalController,
    RemoveBeverageController,
    SearchBeverageController,
  ],
  providers: [
    AddNewBeverageService,
    GetAdminDetailsService,
    GetCodesService,
    GetBasicsService,
    GetDashboardDetailsService,
    GetDataForStatsService,
    GetDetailsService,
    GetTotalService,
    RemoveBeverageService,
    SearchBeverageService,
  ],
})
export class BeverageModule {}
