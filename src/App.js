import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUoPage';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // storing user data in our app
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // console.log('snapshot.data()-----------', snapShot.data());
          this.setState(
            {currentUser: {id: snapShot.id, ...snapShot.data()}}
            // () => {
            //   console.log('this.state--------', this.state);
            // }
          );
          // console.log('this.state App.js---------------', this.state);
        });
      }
      this.setState({currentUser: userAuth});
    });
  }

  // close the subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}
