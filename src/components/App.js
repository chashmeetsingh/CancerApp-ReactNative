import {createStackNavigator, createAppContainer} from 'react-navigation';

import WelcomeScreen from './WelcomeScreen'
import SignInScreen from './SignInScreen'
import HomeView from './HomeView'

import { fromBottom, fromRight } from 'react-navigation-transitions'

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
      && prevScene.route.routeName === 'Welcome'
      && nextScene.route.routeName === 'SignIn') {
    return fromBottom();
  }
  return fromRight();
};

const MainNavigator = createStackNavigator({
  Welcome: {screen: WelcomeScreen},
  SignIn: {screen: SignInScreen},
  Home: {screen: HomeView}
}, {
  transitionConfig: (nav) => handleCustomTransition(nav)
});

const App = createAppContainer(MainNavigator);

export default App;