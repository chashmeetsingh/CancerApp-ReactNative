import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import UserProfile from './UserProfile'
import Projects from './Projects'
import Questions from './Questions'
import Ideas from './Ideas'
import FirebaseSVC from "./FirebaseSVC";
import * as firebase from 'firebase';

export default class ProfileScreen extends Component {

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Profile' },
      { key: '2', title: 'Projects' },
      { key: '3', title: 'Questions' },
      { key: '4', title: 'Ideas' },
    ],
  };

  handleIndexChange = (index) => {
    this.setState({
      index,
    });
  }

  renderTabBar = (props) => (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
      />
  );

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <UserProfile />;
    case '2':
      return <Projects navigation={this.props.navigation} />;
    case '3':
      return <Questions navigation={this.props.navigation} />;
    case '4':
      return <Ideas />;
    default:
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.imageContainer}>
              <Image
                  style={styles.profileImage}
                  source={{uri: FirebaseSVC.shared().currentUser.photoUrl }}
              />
              <Button
                  title='My Collabs'
                  buttonStyle={{backgroundColor: 'white', borderRadius: 10, margin: 10}}
                  containerStyle={{alignItems: 'center', justifyContent: 'center'}}
                  titleStyle={{color: '#00BCD4'}}
              />
          </View>
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={this.handleIndexChange}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      backgroundColor: '#00BCD4',
      flexDirection: 'column',
  },
  profileImage: {
      width: Dimensions.get('window').width / 3.5,
      height: Dimensions.get('window').width / 3.5,
      borderRadius: Dimensions.get('window').width / 7,
      backgroundColor: 'gray'
  },
  tabbar: {
    backgroundColor: '#00BCD4',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: '#008080',
    height: 3
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});
