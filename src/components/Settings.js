import React, { Component } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import {  LoginManager , LoginButton} from 'react-native-fbsdk';

const resetToLogin = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});


class Settings extends Component {

    constructor(props){
        super(props);
        this.state={
            user:null
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('fb-user').then( u => {
            if(u){
                this.setState({user:u});
            } else{
                this.setState({user:null});
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <List containerStyle={{marginTop: 55}}>
                    <ListItem
                        title="Notifications"
                    />
                    <ListItem
                        title="Profile"
                    />
                    <ListItem
                        title="Password"
                    />
                </List>
                <List>
                    {/* this.state.user != null ? 
                    (
                    <LoginButton
                        onLogoutFinished = {() => {
                        AsyncStorage.removeItem('fb-user');
                        this.props.navigation.dispatch(resetToLogin)
                        }}
                    />
                ) : ( */}
                <ListItem
                    title="Sign Out"
                    onPress= {()=> { 
                        firebase.auth().signOut().then( ()=> {
                        }, function(error) {
                            alert(error.mesage)
                        }) 
                    }}
                    rightIcon={{ name: 'cancel' }}
                />
                {/* ) */}
                </List>
            </ScrollView>
        );
    }
}

export default Settings;