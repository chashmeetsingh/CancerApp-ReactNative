import React from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import MatchesScreen from "./MatchesScreen";
import MessagingScreen from './MessageScreen'

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MessageDetail from "./MessageDetail";
import ProfileScreen from "./ProfileScreen";
import CollabBoardScreen from "./CollabBoardScreen";
import FavoritesScreen from "./FavoritesScreen";
import DiscussionScreen from "./DiscussionScreen"
import ProjectDetailScreen from "./ProjectDetail"
import QuestionDetailScreen from "./QuestionDetail"

const MatchesStack = createStackNavigator({
    MatchesView: {
        screen: MatchesScreen,
        navigationOptions: {
            headerTitle: 'Matches',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#00BCD4',
            },
        }
    }
});

const MessagingStack = createStackNavigator({
    MessagingView: {
        screen: MessagingScreen,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#00BCD4',
            }
        }
    },
    MessageDetailView: {
        screen: MessageDetail,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#00BCD4',
            }
        }
    }
});

const ProfileStack = createStackNavigator({
    ProfileView: {
        screen: ProfileScreen,
        navigationOptions: {
            title: 'Profile',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#00BCD4',
            }
        }
    },
    ProfileDetailView: {
      screen: ProjectDetailScreen,
      navigationOptions: {
          title: 'Details',
          headerTintColor: 'white',
          headerStyle: {
              backgroundColor: '#00BCD4',
          }
      }
    },
    QuestionDetailView: {
      screen: QuestionDetailScreen,
      navigationOptions: {
          title: 'Comments',
          headerTintColor: 'white',
          headerStyle: {
              backgroundColor: '#00BCD4',
          }
      }
    }
});

const CollabStack = createStackNavigator({
    CollabView: {
        screen: CollabBoardScreen,
        navigationOptions: {
            title: 'Collab Board',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#00BCD4',
            }
        }
    },
    DiscussionView: {
      screen: DiscussionScreen,
      navigationOptions: {
          title: 'Discussion',
          headerTintColor: 'white',
          headerStyle: {
              backgroundColor: '#00BCD4',
          }
      }
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

CollabStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

ProfileStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

const SavesStack = createStackNavigator({
    SavesView: {
        screen: FavoritesScreen,
        navigationOptions: {
            title: 'Favorites',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#00BCD4',
            }
        }
    }
});

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
    CollabBoard: {
        screen: CollabStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <MaterialIcons
                    name="dashboard"
                    style={{color: tintColor}}
                    size={28}
                />
            ),
        }
    },
    Saves: {
        screen: SavesStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <MaterialIcons
                    name="favorite"
                    style={{color: tintColor}}
                    size={28}
                />
            ),
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
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <FontAwesomeIcon
                    name="user"
                    style={{color: tintColor}}
                    size={28}
                />
            ),
        }
    },
}, {
    tabBarOptions: {
        showLabel: false,
        style: {
            backgroundColor: '#eee',
        },
        activeTintColor: '#00BCD4',
        inactiveTintColor: 'gray'
    }
});

export default createAppContainer(BottomTabNavigator);
