import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details } from 'beverage/utils/types';
import { removeCover } from 'beverage/images/cover/s3-interactions';
import { removeGallery } from 'beverage/images/gallery/s3-interactions';
import { removeCap } from 'beverage/images/cap/s3-interactions';
import { removeFolder } from './s3-interactions';

@Injectable()
export class RemoveBeverageService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async removeBeverage(_id: string) {
    const beverageData = await this.beverageModel.findById(_id);
    const [{ brand }] = await this.beverageModel.getBrandById(_id);
    const cover = beverageData.editorial?.photos?.cover ?? null;
    const files = beverageData.editorial?.photos?.gallery ?? null;
    const cap = beverageData.editorial?.photos?.cap ?? false;
    const { badge, shortId } = beverageData;

    if (cover) {
      await removeCover({
        badge,
        brand,
        shortId,
      });
    }

    if (files) {
      await removeGallery({
        badge,
        brand,
        files,
        shortId,
      });
    }

    if (cap) {
      await removeCap({
        badge,
        brand,
        shortId,
      });
    }

    await removeFolder({
      badge,
      brand,
      shortId,
    });

    const report = await this.beverageModel.deleteOne({ _id }).exec();

    return report;
  }
}
