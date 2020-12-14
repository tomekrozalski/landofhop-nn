import { RawData } from './RawData';

const getAdminDetails = function({ id }: { id: string }): RawData {
  return this.findOne(
    { _id: id },
    { _id: 0, 'editorial.notes': 1, updated: 1 },
  );
};

export default getAdminDetails;
