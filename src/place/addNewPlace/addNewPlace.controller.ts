import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Place } from 'place/utils/types';
import { AddNewPlaceService } from './addNewPlace.service';

@Controller('place')
export class AddNewPlaceController {
  constructor(private readonly placeService: AddNewPlaceService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addNewPlace(
    @Body('city')
    city: {
      language: string;
      value: string;
    },
    @Body('country') country: string,
    @Body('institution') institution: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
    @Body('shortId') shortId: string,
  ) {
    const result: Place[] = await this.placeService.addNewPlace({
      city,
      country,
      institution,
      latitude,
      longitude,
      shortId,
    });

    return result;
  }
}
