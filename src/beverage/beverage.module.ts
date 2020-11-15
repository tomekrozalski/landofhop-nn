import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import BeverageSchema from './utils/schema';

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
  GetDetailsController,
  GetDetailsService,
  GetTotalController,
  GetTotalService,
} from './static';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Beverage', schema: BeverageSchema }]),
  ],
  controllers: [GetBasicsController, GetDetailsController, GetTotalController],
  providers: [GetBasicsService, GetDetailsService, GetTotalService],
})
export class BeverageModule {}
