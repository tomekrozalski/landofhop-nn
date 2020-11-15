const ingredient = [
  // ------------------------------------------------
  // Label - dryHopped
  {
    $lookup: {
      from: 'ingredients',
      localField: 'label.brewing.dryHopped.hops',
      foreignField: '_id',
      as: 'label.brewing.dryHopped_info',
    },
  },
  // ------------------------------------------------
  // Label - ingredients
  {
    $lookup: {
      from: 'ingredients',
      localField: 'label.ingredients.list',
      foreignField: '_id',
      as: 'label.ingredients.list_info',
    },
  },
  // ------------------------------------------------
  // Producer - dryHopped
  {
    $lookup: {
      from: 'ingredients',
      localField: 'producer.brewing.dryHopped.hops',
      foreignField: '_id',
      as: 'producer.brewing.dryHopped_info',
    },
  },
  // ------------------------------------------------
  // Producer - ingredients
  {
    $lookup: {
      from: 'ingredients',
      localField: 'producer.ingredients.list',
      foreignField: '_id',
      as: 'producer.ingredients.list_info',
    },
  },
  // ------------------------------------------------
  // Producer - dryHopped
  {
    $lookup: {
      from: 'ingredients',
      localField: 'editorial.brewing.dryHopped.hops',
      foreignField: '_id',
      as: 'editorial.brewing.dryHopped_info',
    },
  },
];

export default ingredient;
