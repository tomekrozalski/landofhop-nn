type Props = {
  id: string;
  images: number;
};

const saveGallery = function({ id, images }: Props) {
  return this.findByIdAndUpdate(
    id,
    {
      'editorial.photos.gallery': images,
    },
    { useFindAndModify: false },
  );
};

export default saveGallery;
