import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details } from 'beverage/utils/types';
import { ImageFormat, ImageSize } from 'beverage/utils/enums';
import { removeCap, saveCap } from './s3-interactions';

@Injectable()
export class CapService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async saveCap({
    badge,
    brand,
    id,
    image,
    shortId,
  }: {
    badge: string;
    brand: string;
    id: string;
    image: { buffer: Buffer };
    shortId: string;
  }) {
    const capPath = `${brand}/${badge}/${shortId}/cap`;

    const result = Promise.all([
      saveCap({
        capPath,
        format: ImageFormat.webp,
        image,
        size: ImageSize.large,
      }),
      saveCap({
        capPath,
        format: ImageFormat.webp,
        image,
        size: ImageSize.big,
      }),
      saveCap({
        capPath,
        format: ImageFormat.webp,
        image,
        size: ImageSize.small,
      }),
      saveCap({
        capPath,
        format: ImageFormat.jpg,
        image,
        size: ImageSize.large,
      }),
      saveCap({
        capPath,
        format: ImageFormat.jpg,
        image,
        size: ImageSize.big,
      }),
      saveCap({
        capPath,
        format: ImageFormat.jpg,
        image,
        size: ImageSize.small,
      }),
    ])
      .then(async () => {
        await this.beverageModel.saveCap(id);
        return true;
      })
      .catch(() => false);

    return result;
  }

  async removeCap({
    badge,
    brand,
    id,
    shortId,
  }: {
    badge: string;
    brand: string;
    id: string;
    shortId: string;
  }) {
    const result = removeCap({
      badge,
      brand,
      shortId,
    })
      .then(async () => {
        await this.beverageModel.removeCap(id);
        return true;
      })
      .catch(() => false);

    return result;
  }
}
