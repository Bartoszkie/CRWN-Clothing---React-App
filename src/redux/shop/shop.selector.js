import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectCollections], 
  //checmy wszystkie keys i później map przez te key żeby zdobyć value tych key w tablicy 
  collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );
