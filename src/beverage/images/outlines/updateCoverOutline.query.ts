type Props = {
  id: string;
  outline: string;
};

const updateCoverOutline = function({ id, outline }: Props): boolean {
  return this.updateOne(
    { _id: id },
    {
      $set: {
        'editorial.photos.outlines.cover': outline,
      },
    },
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export default updateCoverOutline;
