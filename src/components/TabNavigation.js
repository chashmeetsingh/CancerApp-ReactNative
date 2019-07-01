import React from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import MatchesScreen from "./MatchesScreen";
import MessagingScreen from './MessageScreen'

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MessageDetail from "./MessageDetail";

const MatchesStack = createStackNavigator({
    MatchesView: {
        screen: MatchesScreen,
        navigationOptions: {
            headerTitle: 'Matches'
        }
    }
});

const MessagingStack = createStackNavigator({
    MessagingView: MessagingScreen,
    MessageDetailView: {
        screen: MessageDetail
    }
});

MessagingStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

const BottomTabNavigator = createBottomTabNavigator({
    Matches: {
        screen: MatchesStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <AntDesignIcon
                    name="star"
                    style={{color: tintColor}}
                    size={28}
                />
            )
        }
    },
    Messaging: {
        screen: MessagingStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcon
                    name="email"
                    style={{color: tintColor}}
                    size={28}
                />
            )
        }
    }
}, {
    tabBarOptions: {showLabel: false}
});

export default createAppContainer(BottomTabNavigator);