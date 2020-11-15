const producer = {
  general: {
    series: 1,
    cooperation: {
      $map: {
        input: '$producer.general.cooperation_info',
        as: 'coop',
        in: {
          badge: '$$coop.badge',
          id: '$$coop._id',
          name: '$$coop.name',
          shortId: '$$coop.shortId',
          website: '$$coop.website',
        },
      },
    },
    contract: {
      badge: '$producer.general.contract_info.badge',
      id: '$producer.general.contract_info._id',
      name: '$producer.general.contract_info.name',
      shortId: '$producer.general.contract_info.shortId',
      website: '$producer.general.contract_info.website',
    },
    isContract: 1,
    place: {
      id: '$producer.general.place_info._id',
      city: '$producer.general.place_info.city',
      country: {
        id: '$producer.general.place_info.country._id',
        code: '$producer.general.place_info.country.code',
        name: '$producer.general.place_info.country.name',
      },
      institution: {
        id: '$producer.general.place_info.institution._id',
        shortId: '$producer.general.place_info.institution.shortId',
        badge: '$producer.general.place_info.institution.badge',
        name: '$producer.general.place_info.institution.name',
        consortium: '$producer.general.place_info.institution.consortium',
        website: '$producer.general.place_info.institution.website',
      },
      shortId: '$producer.general.place_info.shortId',
      coordinates: '$producer.general.place_info.location.coordinates',
    },
    remark: 1,
    tale: 1,
  },
  brewing: {
    beverageType: 1,
    fermentation: 1,
    extract: 1,
    alcohol: 1,
    filtration: 1,
    pasteurization: 1,
    aged: 1,
    style: 1,
    isDryHopped: 1,
    dryHopped: {
      hops: {
        $map: {
          input: '$producer.brewing.dryHopped_info',
          as: 'hop',
          in: {
            id: '$$hop._id',
            badge: '$$hop.badge',
            name: '$$hop.name',
            type: '$$hop.type',
          },
        },
      },
    },
    hopRate: 1,
    expirationDate: 1,
  },
  ingredients: {
    description: 1,
    list: {
      $map: {
        input: '$producer.ingredients.list_info',
        as: 'ingredient',
        in: {
          id: '$$ingredient._id',
          badge: '$$ingredient.badge',
          name: '$$ingredient.name',
          type: '$$ingredient.type',
        },
      },
    },
    smokedMalt: 1,
  },
  impressions: {
    bitterness: 1,
    sweetness: 1,
    fullness: 1,
    power: 1,
    hoppyness: 1,
    temperature: 1,
  },
  price: 1,
};

export default producer;
