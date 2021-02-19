import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as sharp from 'sharp';
import * as potrace from 'potrace';
import * as SVGO from 'svgo';
import 'isomorphic-unfetch';

import { Details } from 'beverage/utils/types';

@Injectable()
export class OutlinesService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getTracedSVG({ badge, brand, color, shortId, type }) {
    const svgo = new SVGO({
      multipass: true,
      floatPrecision: 0,
      plugins: [
        {
          removeViewBox: false,
        },
        {
          removeDimensions: true,
        },
      ],
    });

    return new Promise((resolve, reject) => {
      const generalPath = `${process.env.IMAGES_SERVER}/${brand}/${badge}/${shortId}`;
      const imgPath =
        type === 'cover'
          ? `${generalPath}/cover/jpg/4x.jpg`
          : `${generalPath}/container/jpg/4x/01.jpg`;
      const imgColor = `#${color}`;

      fetch(imgPath)
        .then(response => response.arrayBuffer())
        .then(data => {
          const image = Buffer.from(data);

          sharp(image)
            .resize(220)
            .toBuffer()
            .then(preparedImage => {
              potrace.trace(
                preparedImage,
                {
                  color: imgColor,
                  threshold: 200,
                  optTolerance: 0.4,
                  turdSize: 100,
                  turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
                },
                (err: any, svg: string) => {
                  if (err) {
                    reject();
                  }

                  svgo.optimize(svg).then((result: any) => {
                    resolve(result.data);
                  });
                },
              );
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  async updateCoverOutline({ badge, brand, id, shortId }) {
    const outline = await this.getTracedSVG({
      badge,
      brand,
      color: 'ddd',
      shortId,
      type: 'cover',
    });
    const response: boolean = await this.beverageModel.updateCoverOutline({
      id,
      outline,
    });
    return response;
  }

  async updateContainerOutline({ badge, brand, id, shortId }) {
    const outline = await this.getTracedSVG({
      badge,
      brand,
      color: 'ddd',
      shortId,
      type: 'container',
    });
    const response: boolean = await this.beverageModel.updateContainerOutline({
      id,
      outline,
    });
    return response;
  }
}
