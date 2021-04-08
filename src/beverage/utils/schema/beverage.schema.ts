import * as mongoose from 'mongoose';

import editorialSchema from './editorial';
import labelSchema from './label';
import producerSchema from './producer';

// Admin
import { getAdminDetailsQuery } from 'beverage/admin/getAdminDetails';
// import getDetails from 'beverage/admin/getDetails/getDetails.query';
import getBrandById from 'beverage/admin/addNewBeverage/getBrandById.query';
import { getDashboardDetailsQuery } from 'beverage/admin/getDashboardDetails';
// import getImagesData from 'beverage/admin/getImagesData/getImagesData.query';
// import getPatchById from 'beverage/admin/updateBeverage/getPatchById.query';
// import update from 'beverage/admin/updateBeverage/update.query';

// Dynamic
import { searchQuery } from 'beverage/dynamic/search';

// Images
// import saveCap from 'beverage/images/cap/saveCap.query';
// import removeCap from 'beverage/images/cap/removeCap.query';
// import saveCover from 'beverage/images/cover/saveCover.query';
// import saveGallery from 'beverage/images/gallery/saveGallery.query';
// import removeGallery from 'beverage/images/gallery/removeGallery.query';
// import updateContainerOutline from 'beverage/images/outlines/updateContainerOutline.query';
// import updateCoverOutline from 'beverage/images/outlines/updateCoverOutline.query';

// Prefetch
// import getAllBeveragesDetails from 'beverage/prefetch/getAllBeveragesDetails/getAllBeveragesDetails.query';

// Static
import {
  getBasicsQuery,
  getNextBasicsQuery,
  getPreviousBasicsQuery,
} from 'beverage/static/getBasics';
import { getDataForStatsQuery } from 'beverage/static/getDataForStats';

// Mixed
import getBeverageQuery from './getBeverage.query';

// Public
// import search from 'beverage/public/search/search.query';

// --------------------------

const beverageSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      required: true,
    },
    label: {
      type: labelSchema,
      required: true,
    },
    producer: producerSchema,
    editorial: editorialSchema,
    added: {
      type: Date,
      required: true,
    },
    updated: Date,
  },
  { strict: false },
);

beverageSchema.index({ badge: 1, shortId: 1 }, { unique: true });

// Admin
beverageSchema.statics.getAdminDetails = getAdminDetailsQuery;
// beverageSchema.statics.getDetails = getDetails;
beverageSchema.statics.getBrandById = getBrandById;
beverageSchema.statics.getDashboardDetails = getDashboardDetailsQuery;
// beverageSchema.statics.getImagesData = getImagesData;
// beverageSchema.statics.getPatchById = getPatchById;
// beverageSchema.statics.update = update;

// Dynamic
beverageSchema.statics.search = searchQuery;

// Images
// beverageSchema.statics.saveCap = saveCap;
// beverageSchema.statics.removeCap = removeCap;
// beverageSchema.statics.saveCover = saveCover;
// beverageSchema.statics.saveGallery = saveGallery;
// beverageSchema.statics.removeGallery = removeGallery;
// beverageSchema.statics.updateContainerOutline = updateContainerOutline;
// beverageSchema.statics.updateCoverOutline = updateCoverOutline;

// Prefetch
// beverageSchema.statics.getAllBeveragesDetails = getAllBeveragesDetails;

// Static
beverageSchema.statics.getBasics = getBasicsQuery;
beverageSchema.statics.getNextBasics = getNextBasicsQuery;
beverageSchema.statics.getPreviousBasics = getPreviousBasicsQuery;
beverageSchema.statics.getDataForStats = getDataForStatsQuery;

// Miced
beverageSchema.statics.getBeverage = getBeverageQuery;

// Public
// beverageSchema.statics.search = search;

export default beverageSchema;
