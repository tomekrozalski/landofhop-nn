import * as aws from 'aws-sdk';
import * as sharp from 'sharp';

import { ImageFormat, ImageSize } from 'beverage/utils/enums';
import { getSize, getWidth } from 'beverage/utils/helpers';

const s3 = new aws.S3({});

const saveCap = ({
  capPath,
  format,
  image,
  size,
}: {
  capPath: string;
  format: ImageFormat;
  image: any;
  size: ImageSize;
}) =>
  new Promise((resolve, reject) => {
    if (format === ImageFormat.jpg) {
      sharp(image.buffer)
        .jpeg({})
        .resize({ width: getWidth(size), height: getWidth(size) })
        .toBuffer()
        .then(data =>
          s3.upload(
            {
              Bucket: 'land-of-hop-images',
              Key: `${capPath}/jpg/${getSize(size)}.jpg`,
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
        .resize({ width: getWidth(size), height: getWidth(size) })
        .toBuffer()
        .then(data =>
          s3.upload(
            {
              Bucket: 'land-of-hop-images',
              Key: `${capPath}/webp/${getSize(size)}.webp`,
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

export default saveCap;
