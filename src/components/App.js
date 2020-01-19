import {createAppContainer, createStackNavigator} from 'react-navigation';

import WelcomeScreen from './WelcomeScreen'
import SignInScreen from './SignInScreen'

import {fromBottom} from 'react-navigation-transitions'
import CompleteDetails from "./CompleteDetails";
import TabNavigation from "./TabNavigation";

const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    // Custom transitions
    if (prevScene
        && prevScene.route.routeName === 'Welcome'
        && nextScene.route.routeName === 'SignIn') {
        return fromBottom();
    } else if (prevScene
        && prevScene.route.routeName === 'CompleteDetails'
        && nextScene.route.routeName === 'Home') {
        return fromBottom();
    } else if (prevScene
        && prevScene.route.routeName === 'SignIn'
        && prevScene.route.routeName === 'BottomTabNavigator')
        return fromBottom();
};

const MainNavigator = createStackNavigator({
    Welcome: {screen: WelcomeScreen},
    SignIn: {screen: SignInScreen},
    CompleteDetails: {screen: CompleteDetails},
    BottomTabNavigator: {
        screen: TabNavigation,
        navigationOptions: {
            header: null
        }
    }
}, {
    transitionConfig: (nav) => handleCustomTransition(nav),
});

const App = createAppContainer(MainNavigator);

export default App;
