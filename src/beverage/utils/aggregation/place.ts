const place = [
  // ------------------------------------------------
  // Label - place
  {
    $lookup: {
      from: 'places',
      localField: 'label.general.place',
      foreignField: '_id',
      as: 'label.general.place_info',
    },
  },
  {
    $unwind: {
      path: '$label.general.place_info',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'countries',
      localField: 'label.general.place_info.country',
      foreignField: '_id',
      as: 'label.general.place_info.country',
    },
  },
  {
    $unwind: {
      path: '$label.general.place_info.country',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'label.general.place_info.institution',
      foreignField: '_id',
      as: 'label.general.place_info.institution',
    },
  },
  {
    $unwind: {
      path: '$label.general.place_info.institution',
      preserveNullAndEmptyArrays: true,
    },
  },
  // ------------------------------------------------
  // Producer - place
  {
    $lookup: {
      from: 'places',
      localField: 'producer.general.place',
      foreignField: '_id',
      as: 'producer.general.place_info',
    },
  },
  {
    $unwind: {
      path: '$producer.general.place_info',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'countries',
      localField: 'producer.general.place_info.country',
      foreignField: '_id',
      as: 'producer.general.place_info.country',
    },
  },
  {
    $unwind: {
      path: '$producer.general.place_info.country',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'producer.general.place_info.institution',
      foreignField: '_id',
      as: 'producer.general.place_info.institution',
    },
  },
  {
    $unwind: {
      path: '$producer.general.place_info.institution',
      preserveNullAndEmptyArrays: true,
    },
  },
  // ------------------------------------------------
  // Editorial - place
  {
    $lookup: {
      from: 'places',
      localField: 'editorial.general.place',
      foreignField: '_id',
      as: 'editorial.general.place_info',
    },
  },
  {
    $unwind: {
      path: '$editorial.general.place_info',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'countries',
      localField: 'editorial.general.place_info.country',
      foreignField: '_id',
      as: 'editorial.general.place_info.country',
    },
  },
  {
    $unwind: {
      path: '$editorial.general.place_info.country',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'editorial.general.place_info.institution',
      foreignField: '_id',
      as: 'editorial.general.place_info.institution',
    },
  },
  {
    $unwind: {
      path: '$editorial.general.place_info.institution',
      preserveNullAndEmptyArrays: true,
    },
  },
];

export default place;
