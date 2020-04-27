import React from 'react';
import {connect} from 'react-redux';
import {ReactComponent as ShoppingIcon} from '../../assets/cart.svg';
import {toggleCartHidden} from '../../redux/cart/cartActions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import './cart-icon.styles.scss';

function CartIcon({toggleCartHidden, itemCount}) {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

// const mapStateToProps = ({cart: {cartItems}}) => ({
//   // it will accumulate all the number values of the quantities of all the cartItems
//   // selector in Redux not good for performance
//   itemCount: cartItems.reduce(
//     (accumulatedQuantity, cartItem) =>
//       accumulatedQuantity + cartItem.quantity,
//     0
//   )
// });

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
