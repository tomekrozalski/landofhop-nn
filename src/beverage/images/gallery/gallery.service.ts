import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details } from 'beverage/utils/types';
import { ImageFormat, ImageSize } from 'beverage/utils/enums';
import { removeGallery, saveGallery } from './s3-interactions';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async saveGallery({
    badge,
    brand,
    id,
    images,
    shortId,
  }: {
    badge: string;
    brand: string;
    id: string;
    images: { buffer: Buffer }[];
    shortId: string;
  }) {
    const containerPath = `${brand}/${badge}/${shortId}/container`;

    const listOfImagesToSave = images.reduce((acc, image, i) => {
      const properIndex = i + 1;
      const fileName =
        properIndex < 10 ? `0${properIndex}` : properIndex.toString();

      return [
        ...acc,
        saveGallery({
          containerPath,
          fileName,
          format: ImageFormat.webp,
          image,
          size: ImageSize.large,
        }),
        saveGallery({
          containerPath,
          fileName,
          format: ImageFormat.webp,
          image,
          size: ImageSize.big,
        }),
        saveGallery({
          containerPath,
          fileName,
          format: ImageFormat.webp,
          image,
          size: ImageSize.small,
        }),
        saveGallery({
          containerPath,
          fileName,
          format: ImageFormat.jpg,
          image,
          size: ImageSize.large,
        }),
        saveGallery({
          containerPath,
          fileName,
          format: ImageFormat.jpg,
          image,
          size: ImageSize.big,
        }),
        saveGallery({
          containerPath,
          fileName,
          format: ImageFormat.jpg,
          image,
          size: ImageSize.small,
        }),
      ];
    }, []);

    const result = Promise.all(listOfImagesToSave)
      .then(async data => {
        await this.beverageModel.saveGallery({ id, images: images.length });
        return true;
      })
      .catch(() => false);

    return result;
  }

  async removeGallery({
    badge,
    brand,
    files,
    id,
    shortId,
  }: {
    badge: string;
    brand: string;
    files: number;
    id: string;
    shortId: string;
  }) {
    const result = removeGallery({
      badge,
      brand,
      files,
      shortId,
    })
      .then(async () => {
        await this.beverageModel.removeGallery({ id });
        return true;
      })
      .catch(() => false);

    return result;
  }
}
