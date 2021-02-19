import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details } from 'beverage/utils/types';
import { DataType } from './Data.type';
import normalize from './normalize';

@Injectable()
export class AddNewBeverageService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async addNewBeverage(data: DataType) {
    const newBeverage = new this.beverageModel(normalize(data));
    const { _id } = await newBeverage.save();

    const [{ brand: brandBadge }] = await this.beverageModel.getBrandById(_id);
    return { badge: data.badge, brand: brandBadge, shortId: data.shortId };
  }
}
