import React from "react";
//Route takes 3 paramethers: exact path component
import { Route, Switch } from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.components';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import "./App.css";

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    //methoda z firebase.auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAth => {
      if(userAth) {
        const userRef = await createUserProfileDocument(userAth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id, 
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }else{
        this.setState({currentUser: userAth});
      }
    });
  }

  componentWillUnmount() {
    console.log('component unmounted');
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
      {/* Jeśli route będący w switchu pasujący URL, nie wyrenderuje nicz innego jak tego Routa */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
