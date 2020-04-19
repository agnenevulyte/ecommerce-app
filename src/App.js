import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';

const HatsPage = () => (
  <div>
    <h1>Hats page</h1>
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
