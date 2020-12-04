import { institution } from 'beverage/utils/aggregation';
import { RawData } from './rawData.d';

const getDataForStats = function(): RawData[] {
  return this.aggregate([
    ...institution,
    {
      $project: {
        _id: 0,
        id: '$_id',
        brand: {
          id: '$label.general.brand_info._id',
          name: '$label.general.brand_info.name',
        },
        fermentation: {
          label: '$label.brewing.fermentation',
          producer: '$producer.brewing.fermentation',
          editorial: '$editorial.brewing.fermentation',
        },
        extract: {
          label: '$label.brewing.extract',
          producer: '$producer.brewing.extract',
        },
        alcohol: {
          label: '$label.brewing.alcohol',
          producer: '$producer.brewing.alcohol',
          editorial: '$editorial.brewing.alcohol',
        },

        container: {
          type: '$label.container.type',
        },
        added: 1,
      },
    },
    { $sort: { added: -1 } },
  ]);
};

export default getDataForStats;
