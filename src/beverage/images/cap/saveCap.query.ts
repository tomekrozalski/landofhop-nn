const saveCap = function(id: string) {
  return this.findByIdAndUpdate(
    id,
    { 'editorial.photos.cap': true },
    { useFindAndModify: false },
  );
};

export default saveCap;
