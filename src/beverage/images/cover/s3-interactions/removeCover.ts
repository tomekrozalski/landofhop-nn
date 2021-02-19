import * as aws from 'aws-sdk';

const s3 = new aws.S3({});

const removeCover = ({
  badge,
  brand,
  shortId,
}: {
  badge: string;
  brand: string;
  shortId: string;
}) => {
  const paths = [
    { Key: `${brand}/${badge}/${shortId}/cover/jpg/4x.jpg` },
    { Key: `${brand}/${badge}/${shortId}/cover/jpg/2x.jpg` },
    { Key: `${brand}/${badge}/${shortId}/cover/jpg/1x.jpg` },
    { Key: `${brand}/${badge}/${shortId}/cover/webp/4x.webp` },
    { Key: `${brand}/${badge}/${shortId}/cover/webp/2x.webp` },
    { Key: `${brand}/${badge}/${shortId}/cover/webp/1x.webp` },
    { Key: `${brand}/${badge}/${shortId}/cover/jpg` },
    { Key: `${brand}/${badge}/${shortId}/cover/webp` },
    { Key: `${brand}/${badge}/${shortId}/cover` },
  ];

  const params = {
    Bucket: 'land-of-hop-images',
    Delete: {
      Objects: paths,
      Quiet: true,
    },
  };

  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, err => {
      err ? reject(err) : resolve();
    });
  });
};

export default removeCover;
