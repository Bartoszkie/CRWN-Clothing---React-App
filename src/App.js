import React from "react";
//Route takes 3 paramethers: exact path component
import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect';
import { setCurrentUser } from "./redux/user/user.actions";

import {selectCurrentUser} from './redux/user/user.selector';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckOutPage from './components/checkout/checkout.component';
import Header from "./components/header/header.components";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  // constructor(){
  //   super();

  //   this.state = {
  //     currentUser: null
  //   };
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    
    //methoda z firebase.auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAth => {
      if (userAth) {
        const userRef = await createUserProfileDocument(userAth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAth);
      }
    });
  }

  componentWillUnmount() {
    console.log("component unmounted");

    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        {/* Jeśli route będący w switchu pasujący URL, nie wyrenderuje nicz innego jak tego Routa */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path='/checkout' component={CheckOutPage}/>
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//chcemy miec dostep do currentUser w naszych propsach więc musimy zrobić mapStateToProps
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
