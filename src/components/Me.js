import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { me } from '../config/data';
import firebase from 'firebase'
class Me extends Component {

    constructor(props){
        super(props);
        this.state={
            user:{
                displayName:'Not Defined',
                email:'Not Defined',
                phoneNumber:'Not Defined'
            }
        }
    }

    handleSettingsPress = () => {
        this.props.navigation.navigate('Settings');
    };
    handlePointsPress = () => {
        this.props.navigation.navigate('Points');
    };

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
            {
                console.log(user.displayName)
                this.setState({user:user})
            }else{
                this.setState({user:{}})
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <ScrollView>
                <Tile
                    // Commmented the image src out because its expecting an image when pushed to this screen 
                    //  but nothing is passed. Only uncomment if you are sure of passing data here to this screen
                    // imageSrc={{ uri: this.props.picture.large}}
                    // featured
                    // title={`${this.state.user.displayName.toUpperCase()} ${this.props.name.last.toUpperCase()}`}
                    // caption={this.state.user.displayName}
                />

                <Button
                    title="Settings"
                    buttonStyle={{ marginTop: 20 }}
                    onPress={this.handleSettingsPress}
                />
                <Button
                    title="My Points"
                    buttonStyle={{ marginTop: 20 }}
                    onPress={this.handlePointsPress}
                />

                <List>
                    <ListItem
                        title="Email"
                        rightTitle={this.state.user.email}
                        hideChevron
                    />
                    <ListItem
                        title="Phone"
                        rightTitle={this.state.user.phoneNumber === null ? 'Not Defined' : this.state.user.phoneNumber }
                        hideChevron
                    />
                </List>

                <List>
                    <ListItem
                        title="Username"
                        // rightTitle={'Not Defined'}
                        rightTitle={this.state.user.displayName }
                        hideChevron
                    />
                </List>

               
            </ScrollView>
        );
    }
}

Me.defaultProps = { ...me };

export default Me;