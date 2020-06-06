import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector([ selectShop ], (shop) => shop.collections);

// that's how  we map through objects. 1. get the keys 2. map through keys
export const selectCollectionsForPreview = createSelector(
	[ selectCollections ],
	(collections) => (collections ? Object.keys(collections).map((key) => collections[key]) : [])
);

export const selectCollection = (collectionUrlParam) =>
	createSelector([ selectCollections ], (collections) => (collections ? collections[collectionUrlParam] : null));

export const selectIsCollectionFetching = createSelector(
	[selectShop],
	shop => shop.isFetching
);

export const selectIsCollectionsLoading = createSelector(
	[selectShop],
	shop => !!shop.collections
);