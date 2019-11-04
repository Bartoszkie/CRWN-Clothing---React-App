import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectCollections], 
  //mapowanie tablicy na obiekt
  //checmy wszystkie keys i później map przez te key żeby zdobyć value tych key w tablicy 
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

