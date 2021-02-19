type Props = {
  id: string;
};

const removeGallery = function({ id }: Props) {
  return this.findByIdAndUpdate(
    id,
    {
      $unset: {
        'editorial.photos.gallery': '',
        'editorial.photos.outlines.gallery': '',
      },
    },
    { useFindAndModify: false },
  );
};

export default removeGallery;
