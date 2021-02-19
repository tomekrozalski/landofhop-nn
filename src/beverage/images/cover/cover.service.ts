import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as sizeOf from 'buffer-image-size';

import { Details } from 'beverage/utils/types';
import { ImageFormat, ImageSize } from 'beverage/utils/enums';
import { saveCover } from './s3-interactions';

@Injectable()
export class CoverService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async saveCover({
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
    const coverPath = `${brand}/${badge}/${shortId}/cover`;

    const result = Promise.all([
      saveCover({
        coverPath,
        format: ImageFormat.webp,
        image,
        size: ImageSize.large,
      }),
      saveCover({
        coverPath,
        format: ImageFormat.webp,
        image,
        size: ImageSize.big,
      }),
      saveCover({
        coverPath,
        format: ImageFormat.webp,
        image,
        size: ImageSize.small,
      }),
      saveCover({
        coverPath,
        format: ImageFormat.jpg,
        image,
        size: ImageSize.large,
      }),
      saveCover({
        coverPath,
        format: ImageFormat.jpg,
        image,
        size: ImageSize.big,
      }),
      saveCover({
        coverPath,
        format: ImageFormat.jpg,
        image,
        size: ImageSize.small,
      }),
    ])
      .then(async () => {
        const { height, width } = sizeOf(image.buffer);
        await this.beverageModel.saveCover({ height, id, width });
        return true;
      })
      .catch(() => false);

    return result;
  }
}
