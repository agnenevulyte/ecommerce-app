import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

import Header from './components/header/Header';
import { selectCuttentUser } from './redux/user/user.selectors';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/userActions';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser, collectionsArray } = this.props;
		// storing user data in our app
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			}
			setCurrentUser(userAuth);
			// returning an array with the values we want to keep, otherwise we would return just collectionsArray
			addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
		});
	}

	// close the subscription
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />
					<Route
						exact
						path="/signin"
						render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />)}
					/>
				</Switch>
			</div>
		);
	}
}

// we have access to this.props.currentUser
const mapStateToProps = createStructuredSelector({
	currentUser: selectCuttentUser,
	collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
