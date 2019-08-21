import React from "react";

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {SignInWithGoogle} from '../../firebase/firebase.utils';

import "./sign-in.style.scss";
import { auth, signInWithGoogle } from "firebase";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: '', password: ''
      });
    }catch(error) {
      console.error(error);
    }
    this.setState({ email: '', password: ''});
  };

  handleChange = event => {
    const { value, name } = event.target;
    //jesli name = password to będzie pole: password: --tutaj value password--
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
             <CustomButton type="submit" value="Submit" > Sign in </CustomButton>
             <CustomButton onClick={SignInWithGoogle} value="Submit" isGoogleSignIn> Sign in With Google </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
