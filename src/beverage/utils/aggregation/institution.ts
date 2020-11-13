const institution = [
  // ------------------------------------------------
  // Label - brand, contract, cooperation
  {
    $lookup: {
      from: 'institutions',
      localField: 'label.general.brand',
      foreignField: '_id',
      as: 'label.general.brand_info',
    },
  },
  {
    $unwind: '$label.general.brand_info',
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'label.general.brand_info.consortium',
      foreignField: '_id',
      as: 'label.general.brand_info.consortium_info',
    },
  },
  {
    $unwind: {
      path: '$label.general.brand_info.consortium_info',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'label.general.contract',
      foreignField: '_id',
      as: 'label.general.contract_info',
    },
  },
  {
    $unwind: {
      path: '$label.general.contract_info',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'label.general.cooperation',
      foreignField: '_id',
      as: 'label.general.cooperation_info',
    },
  },
  // ------------------------------------------------
  // Producer - contract, cooperation
  {
    $lookup: {
      from: 'institutions',
      localField: 'producer.general.contract',
      foreignField: '_id',
      as: 'producer.general.contract_info',
    },
  },
  {
    $unwind: {
      path: '$producer.general.contract_info',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'producer.general.cooperation',
      foreignField: '_id',
      as: 'producer.general.cooperation_info',
    },
  },
  // ------------------------------------------------
  // Editorial - contract, cooperation
  {
    $lookup: {
      from: 'institutions',
      localField: 'editorial.general.contract',
      foreignField: '_id',
      as: 'editorial.general.contract_info',
    },
  },
  {
    $unwind: {
      path: '$editorial.general.contract_info',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'institutions',
      localField: 'editorial.general.cooperation',
      foreignField: '_id',
      as: 'editorial.general.cooperation_info',
    },
  },
];

export default institution;
