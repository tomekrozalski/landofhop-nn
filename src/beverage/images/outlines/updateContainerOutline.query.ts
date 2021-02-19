type Props = {
  id: string;
  outline: string;
};

const updateContainerOutline = function({ id, outline }: Props): boolean {
  return this.updateOne(
    { _id: id },
    {
      $set: {
        'editorial.photos.outlines.gallery': outline,
      },
    },
  )
    .then(() => true)
    .catch(() => false);
};

export default updateContainerOutline;
