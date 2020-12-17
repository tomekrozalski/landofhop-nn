import { institution, ingredient, place } from 'beverage/utils/aggregation';
import { editorial, label, producer } from 'beverage/utils/project';
import { RawData } from 'beverage/static/getBasics/RawData';

const search = function({ phrase }: { phrase: string }): RawData[] {
  return this.aggregate([
    ...institution,
    ...place,
    ...ingredient,
    {
      $project: {
        _id: 0,
        id: '$_id',
        shortId: 1,
        badge: 1,
        ...{ label },
        ...{ producer },
        ...{ editorial },
        added: 1,
        updated: 1,
      },
    },
    {
      $match: {
        $or: [
          // FIND BY:
          // Badge
          { badge: { $regex: new RegExp(phrase, 'i') } },
          // Name
          { 'label.general.name.value': { $regex: new RegExp(phrase, 'i') } },
          // Brand name
          {
            'label.general.brand.name.value': {
              $regex: new RegExp(phrase, 'i'),
            },
          },
          // Series (label / producer)
          { 'label.general.series.value': { $regex: new RegExp(phrase, 'i') } },
          {
            'producer.general.series.value': {
              $regex: new RegExp(phrase, 'i'),
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        shortId: 1,
        badge: 1,
        brand: {
          badge: '$label.general.brand.badge',
          name: '$label.general.brand.name',
        },
        name: '$label.general.name',
        photos: {
          cover: {
            height: '$editorial.photos.cover.height',
            width: '$editorial.photos.cover.width',
          },
          outlines: {
            cover: '$editorial.photos.outlines.cover',
          },
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

export default search;
