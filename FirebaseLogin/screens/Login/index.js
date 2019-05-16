import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView, TouchableOpacity, Text, Image} from 'react-native';
import InputField from "../../components/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import GetStarted from './GetStarted';
import Firebase from '../../api/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';

import { AccessToken, LoginManager} from 'react-native-fbsdk';

const companyLogo = require('../../assets/er.png');
const email = require('../../assets/email.png');
const password = require('../../assets/password.png');
const resetToHome = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
});
 
export default class Login extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props)
  }

  state = {
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isLogin: false,
  };
  
    async facebookLogin() {
      try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    
        if (result.isCancelled) {
          // handle this however suites the flow of your app
          throw new Error('User cancelled request'); 
        }
    
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
    
        // get the access token
        const data = await AccessToken.getCurrentAccessToken();
    
        if (!data) {
          // handle this however suites the flow of your app
          throw new Error('Something went wrong obtaining the users access token');
        }
    
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    
        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    
        console.warn(JSON.stringify(firebaseUserCredential.user))
      } catch (e) {
        alert(e);
      }
    }

  getStarted = () => {
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();

    this.setState({
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
    }, () => {
      if(email !== '' && password !== ''){
        this.loginToFireBase(email, password);
      } else {
        console.warn('Fill up all fields')
      }
    });
  };

  changeInputFocus = name => () => {
    if (name === 'Email') {
      this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
      this.password.input.focus();
    } else {
      this.setState({ isPasswordCorrect: this.password.getInputValue() === '' });
    }
  };

  loginToFireBase = (email, password) => {
    this.setState({ isLogin: true });
    Firebase.userLogin(email, password)
      .then(user => {
        if(user) 
        this.props.navigation.dispatch(resetToHome)
        this.setState({ isLogin: false });
      });
  };

  render() {
    return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer]} >
      <Image style={styles.icon} resizeMode="contain" source={companyLogo}/>
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          style={styles.email}
          error={this.state.isEmailCorrect}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <InputField
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry={true}
          blurOnSubmit={true}
          error={this.state.isPasswordCorrect}
          ref={ref => this.password = ref}
          focus={this.changeInputFocus}
          icon={password}
        />
        <GetStarted
          click={this.getStarted}
          isLogin={this.state.isLogin}
        />
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={this.props.change('register')} style={styles.touchable} activeOpacity={0.6}>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={this.facebookLogin.bind(this)} style={styles.touchable} activeOpacity={0.6}>
            <Text style={styles.facebookLogin}>Login With Facebook</Text>
          </TouchableOpacity>
        
        
          <TouchableOpacity onPress={this.props.change('forgot')} style={styles.touchable} activeOpacity={0.6}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    justifyContent:'center',
    alignItems:'center'
  },
  icon: {
    width: w(70),
    height: h(30),
    marginTop: h(5),
    marginBottom: h(2),
  },
  textContainer: {
    width: w(100),
    flexDirection: 'row',
    marginTop: h(5),
    marginBottom: 20,
  },
  email: {
    marginBottom: h(4.5),
  },
  touchable: {
    flex: 1,
  },
  createAccount: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  forgotPassword: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  facebookLogin: {
    color:'#ff00ff',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
});
