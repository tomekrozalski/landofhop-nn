import { Model } from 'mongoose';
import { isNumber } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Place } from 'place/utils/types';

@Injectable()
export class AddNewPlaceService {
  constructor(
    @InjectModel('Place')
    private readonly placeModel: Model<Place>,
  ) {}

  async addNewPlace({
    city,
    country,
    institution,
    latitude,
    longitude,
    shortId,
  }) {
    const newPlace = new this.placeModel({
      city: city.map(({ language, value }) => ({
        ...(language !== 'none' && { language }),
        value,
      })),
      country,
      institution,
      shortId,
      ...(isNumber(latitude) &&
        isNumber(longitude) && {
          location: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
        }),
    });

    await newPlace.save();

    const updatedPlaces = await this.placeModel.getAllPlaces();
    return updatedPlaces;
  }
}
