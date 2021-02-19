import * as aws from 'aws-sdk';

const s3 = new aws.S3({});

const removeFolder = ({
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
      Objects: [{ Key: `${brand}/${badge}/${shortId}` }],
      Quiet: true,
    },
  };

  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, err => {
      err ? reject(err) : resolve(true);
    });
  });
};

export default removeFolder;
