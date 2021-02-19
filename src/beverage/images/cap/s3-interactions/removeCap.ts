import * as aws from 'aws-sdk';

const s3 = new aws.S3({});

const removeCap = ({
  badge,
  brand,
  shortId,
}: {
  badge: string;
  brand: string;
  shortId: string;
}) => {
  const params = {
    Bucket: 'land-of-hop-images',
    Delete: {
      Objects: [
        { Key: `${brand}/${badge}/${shortId}/cap/jpg/4x.jpg` },
        { Key: `${brand}/${badge}/${shortId}/cap/jpg/2x.jpg` },
        { Key: `${brand}/${badge}/${shortId}/cap/jpg/1x.jpg` },
        { Key: `${brand}/${badge}/${shortId}/cap/webp/4x.webp` },
        { Key: `${brand}/${badge}/${shortId}/cap/webp/2x.webp` },
        { Key: `${brand}/${badge}/${shortId}/cap/webp/1x.webp` },
        { Key: `${brand}/${badge}/${shortId}/cap/jpg` },
        { Key: `${brand}/${badge}/${shortId}/cap/webp` },
        { Key: `${brand}/${badge}/${shortId}/cap` },
      ],
      Quiet: true,
    },
  };

  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

export default removeCap;
