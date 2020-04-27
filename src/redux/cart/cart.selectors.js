import {createSelector} from 'reselect';

// 1. imput and output selector

// input selector
const selectCart = (state) => state.cart;

// output selector
// the selectCartItems is now a memoize selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
