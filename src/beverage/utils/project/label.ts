const label = {
  general: {
    name: 1,
    series: 1,
    brand: {
      id: '$label.general.brand_info._id',
      shortId: '$label.general.brand_info.shortId',
      badge: '$label.general.brand_info.badge',
      name: '$label.general.brand_info.name',
      consortium: '$label.general.brand_info.consortium_info.name',
      website: '$label.general.brand_info.website',
    },
    cooperation: {
      $map: {
        input: '$label.general.cooperation_info',
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
      badge: '$label.general.contract_info.badge',
      id: '$label.general.contract_info._id',
      name: '$label.general.contract_info.name',
      shortId: '$label.general.contract_info.shortId',
      website: '$label.general.contract_info.website',
    },
    isContract: 1,
    place: {
      id: '$label.general.place_info._id',
      city: '$label.general.place_info.city',
      country: {
        id: '$label.general.place_info.country._id',
        code: '$label.general.place_info.country.code',
        name: '$label.general.place_info.country.name',
      },
      institution: {
        id: '$label.general.place_info.institution._id',
        shortId: '$label.general.place_info.institution.shortId',
        badge: '$label.general.place_info.institution.badge',
        name: '$label.general.place_info.institution.name',
        consortium: '$label.general.place_info.institution.consortium',
        website: '$label.general.place_info.institution.website',
      },
      shortId: '$label.general.place_info.shortId',
      coordinates: '$label.general.place_info.location.coordinates',
    },
    remark: 1,
    tale: 1,
    barcode: 1,
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
          input: '$label.brewing.dryHopped_info',
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
        input: '$label.ingredients.list_info',
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
  container: 1,
  price: 1,
};

export default label;
