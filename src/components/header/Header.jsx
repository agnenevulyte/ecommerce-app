import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/original.svg';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';
import './header.styles.scss';

function Header({currentUser, hidden}) {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
        <Link to="/contact" className="option">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
}

// takes state, then takes user from rootReducer.js, then takes currentUser from userReducer.js
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);
