
import React, { Component } from 'react';
import firebase from 'firebase'

import { View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

const resetToHome = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
});

const resetToLogin = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

export default class Splash extends Component {
 
    constructor(props) {
        super(props);
        this.state={
            netStatus:null
        }
    }

    loadSplash(){
        // AsyncStorage.getItem('fb-user').then(u=>{
        //     if(u){
        //         this.props.navigation.dispatch(resetToHome)
        //     } else {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) 
                    {
                        this.props.navigation.dispatch(resetToHome)
                    }
                    else
                    {
                        this.props.navigation.dispatch(resetToLogin)
                    }
                })
        //     }
        // })

    }
    componentDidMount() {    
        this.loadSplash()    
    }
    
  render() {
    return (
      <View style={[{flex:1,alignItems:'center', justifyContent:'center'}]} >
      </View>
    );
  }
}