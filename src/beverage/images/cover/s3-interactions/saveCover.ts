import * as aws from 'aws-sdk';
import * as sharp from 'sharp';

import { getSize, getWidth } from 'beverage/utils/helpers';
import { ImageFormat, ImageSize } from 'beverage/utils/enums';

const s3 = new aws.S3({});

const saveCover = ({
  coverPath,
  format,
  image,
  size,
}: {
  coverPath: string;
  format: ImageFormat;
  image: any;
  size: ImageSize;
}) =>
  new Promise((resolve, reject) => {
    if (format === ImageFormat.jpg) {
      sharp(image.buffer)
        .jpeg({})
        .resize(getWidth(size))
        .toBuffer()
        .then(data =>
          s3.upload(
            {
              Bucket: 'land-of-hop-images',
              Key: `${coverPath}/jpg/${getSize(size)}.jpg`,
              Body: data,
              ACL: 'public-read',
            },
            (errors, data) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(data);
              }
            },
          ),
        );
    }

    if (format === ImageFormat.webp) {
      sharp(image.buffer)
        .webp({})
        .resize(getWidth(size))
        .toBuffer()
        .then(data =>
          s3.upload(
            {
              Bucket: 'land-of-hop-images',
              Key: `${coverPath}/webp/${getSize(size)}.webp`,
              Body: data,
              ACL: 'public-read',
            },
            (errors, data) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(data);
              }
            },
          ),
        );
    }
  });

export default saveCover;
