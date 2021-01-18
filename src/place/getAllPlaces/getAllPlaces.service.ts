import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Place } from 'place/utils/types';
import normalize from './normalize';

@Injectable()
export class GetAllPlacesService {
  constructor(
    @InjectModel('Place')
    private readonly placeModel: Model<Place>,
  ) {}

  async getAllPlaces(): Promise<Place[]> {
    const places: Place[] = await this.placeModel.getAllPlaces();
    return places.map(normalize);
  }
}
