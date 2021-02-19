const removeCap = function(id: string) {
  return this.findByIdAndUpdate(
    id,
    {
      $unset: {
        'editorial.photos.cap': '',
      },
    },
    { useFindAndModify: false },
  );
};

export default removeCap;
