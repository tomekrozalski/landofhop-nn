import { Controller, Get } from '@nestjs/common';

import { Place } from 'place/utils/types';
import { GetAllPlacesService } from './getAllPlaces.service';

@Controller('place')
export class GetAllPlacesController {
  constructor(private readonly placeService: GetAllPlacesService) {}

  @Get('getAll')
  async getAllplaces() {
    const places: Place[] = await this.placeService.getAllPlaces();
    return places;
  }
}
