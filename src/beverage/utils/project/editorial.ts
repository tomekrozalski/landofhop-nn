const editorial = {
  general: {
    cooperation: {
      $map: {
        input: '$editorial.general.cooperation_info',
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
      badge: '$editorial.general.contract_info.badge',
      id: '$editorial.general.contract_info._id',
      name: '$editorial.general.contract_info.name',
      shortId: '$editorial.general.contract_info.shortId',
      website: '$editorial.general.contract_info.website',
    },
    isContract: 1,
    place: {
      id: '$editorial.general.place_info._id',
      city: '$editorial.general.place_info.city',
      country: {
        id: '$editorial.general.place_info.country._id',
        code: '$editorial.general.place_info.country.code',
        name: '$editorial.general.place_info.country.name',
      },
      institution: {
        id: '$editorial.general.place_info.institution._id',
        shortId: '$editorial.general.place_info.institution.shortId',
        badge: '$editorial.general.place_info.institution.badge',
        name: '$editorial.general.place_info.institution.name',
        consortium: '$editorial.general.place_info.institution.consortium',
        website: '$editorial.general.place_info.institution.website',
      },
      shortId: '$editorial.general.place_info.shortId',
      coordinates: '$editorial.general.place_info.location.coordinates',
    },
  },
  brewing: {
    beverageType: 1,
    fermentation: 1,
    alcohol: 1,
    filtration: 1,
    pasteurization: 1,
    aged: 1,
    style: 1,
    isDryHopped: 1,
    dryHopped: {
      hops: {
        $map: {
          input: '$editorial.brewing.dryHopped_info',
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
  },
  impressions: {
    color: 1,
    clarity: 1,
  },
  price: 1,
  photos: 1,
  notes: 1,
};

export default editorial;
