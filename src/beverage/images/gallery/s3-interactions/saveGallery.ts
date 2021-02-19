import * as aws from 'aws-sdk';
import * as sharp from 'sharp';

import { ImageFormat, ImageSize } from 'beverage/utils/enums';
import { getSize, getWidth } from 'beverage/utils/helpers';

const s3 = new aws.S3({});

const saveGallery = ({
  containerPath,
  fileName,
  format,
  image,
  size,
}: {
  containerPath: string;
  fileName: string;
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
        .then(data => {
          s3.upload(
            {
              Bucket: 'land-of-hop-images',
              Key: `${containerPath}/jpg/${getSize(size)}/${fileName}.jpg`,
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
          );
        });
    }

    if (format === ImageFormat.webp) {
      sharp(image.buffer)
        .webp({})
        .resize(getWidth(size))
        .toBuffer()
        .then(data => {
          s3.upload(
            {
              Bucket: 'land-of-hop-images',
              Key: `${containerPath}/webp/${getSize(size)}/${fileName}.webp`,
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
          );
        });
    }
  });

export default saveGallery;
