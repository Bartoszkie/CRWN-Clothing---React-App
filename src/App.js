import React from "react";
//Route takes 3 paramethers: exact path component
import { Route, Switch } from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import "./App.css";

function App() {
  return (
    <div>
    {/* Jeśli route będący w switchu pasujący URL, nie wyrenderuje nicz innego jak tego Routa */}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
