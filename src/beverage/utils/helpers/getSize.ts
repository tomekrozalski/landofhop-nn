import { ImageSize } from 'beverage/utils/enums';

const getSize = (size: ImageSize) => {
  switch (size) {
    case ImageSize.large:
      return '4x';
    case ImageSize.big:
      return '2x';
    case ImageSize.small:
    default:
      return '1x';
  }
};

export default getSize;
