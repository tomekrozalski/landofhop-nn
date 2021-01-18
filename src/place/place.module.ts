import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import PlaceSchema from 'place/utils/place.schema';
import { GetAllPlacesController, GetAllPlacesService } from './getAllPlaces';
import { AddNewPlaceController, AddNewPlaceService } from './addNewPlace';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
  ],
  controllers: [GetAllPlacesController, AddNewPlaceController],
  providers: [GetAllPlacesService, AddNewPlaceService],
})
export class PlaceModule {}
