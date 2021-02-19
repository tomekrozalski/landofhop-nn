import * as aws from 'aws-sdk';

import { galleryPathsToRemove } from '.';

const s3 = new aws.S3({});

const removeGallery = (options: {
	badge: string,
	brand: string,
	files: number,
	shortId: string,
}) => {
	const paths = galleryPathsToRemove(options);

	const params = {
		Bucket: 'land-of-hop-images',
		Delete: {
			Objects: paths,
			Quiet: true,
		},
	};

	return new Promise((resolve, reject) => {
		s3.deleteObjects(params, (err) => {
			if (err) {
				reject(err);
			}

			resolve();
		});
	})
};

export default removeGallery;
