
import React from 'react';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator,createAppContainer  } from 'react-navigation';
import { Icon } from 'react-native-elements';


import Feed from '../components/Feed';
import Settings from '../components/Settings';
import Points from '../components/Points';
import UserDetail from '../components/UserDetail';
import Me from '../components/Me'
import Task from '../components/Tasks'
import FirebaseLogin from "../../FirebaseLogin";
import Splash from '../screens/splash';





export const Tabs = createBottomTabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor }) => <Icon name="event" size={35} color={tintColor} />,
        },
    },
    Tasks: {
        screen: Task,
        navigationOptions: {
            tabBarLabel: 'Tasks',
            tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
        },
    },
    Me: {
        screen: Me,
        navigationOptions: {
            tabBarLabel: 'Me',
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        },
    },
    
});

export const StackNavigator = createStackNavigator({
    Splash:{screen:Splash},
    Tabs: {screen : Tabs},
    Login:{screen:FirebaseLogin},
    Feed: {
        screen: Feed,
        navigationOptions: {
            title: 'Feed',
        },
    },
    Details: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
        }),
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings',
        },
    },
    Points: {
        screen: Points,
        navigationOptions: {
            title: 'Points',
        },
    },
    
}, {
    mode: 'modal',
    headerMode: 'none',
});


export const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;