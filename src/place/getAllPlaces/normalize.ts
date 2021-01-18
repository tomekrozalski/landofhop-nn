import { Place } from 'place/utils/types';

const normalizePlace = ({ coordinates, ...rest }: Place): Place => ({
  ...(coordinates && { coordinates: coordinates.map(value => +value) }),
  ...rest,
});

export default normalizePlace;
