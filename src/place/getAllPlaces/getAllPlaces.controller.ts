import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Place } from 'place/utils/types';
import { GetAllPlacesService } from './getAllPlaces.service';

@Controller('place')
export class GetAllPlacesController {
  constructor(private readonly placeService: GetAllPlacesService) {}

  @Get('getAll')
  @UseGuards(AuthGuard)
  async getAllplaces() {
    const places: Place[] = await this.placeService.getAllPlaces();
    return places;
  }
}
