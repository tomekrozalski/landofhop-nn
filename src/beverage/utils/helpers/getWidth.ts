import { ImageSize } from 'beverage/utils/enums';

const getWidth = (size: ImageSize) => {
  switch (size) {
    case ImageSize.large:
      return 880;
    case ImageSize.big:
      return 440;
    case ImageSize.small:
    default:
      return 220;
  }
};

export default getWidth;
