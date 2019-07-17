import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Button} from "react-native-elements";
import {TabBar, TabView,} from 'react-native-tab-view';
import UserProfile from './UserProfile'
import Projects from './Projects'
import Questions from './Questions'
import Ideas from './Ideas'
import Firebase from "./FirebaseSVC";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackActions, NavigationActions } from 'react-navigation';

export default class ProfileScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        if (params.showLogoutButton === true) {
          return {
              headerRight: <MaterialCommunityIcon
                  name="logout"
                  style={{color: 'white', paddingRight: 14}}
                  size={22}
                  onPress={() => params.logout(params)}
              />
          };
        } else {
          return {
              title: navigation.state.params === undefined ? 'Profile' : navigation.state.params.user.name
          };
        }
    };

    componentWillReceiveProps(nextProps){
      this.setState({
        user: this.props.navigation.getParam('user', Firebase.shared().currentUser)
      })
    }

    componentDidMount() {
      this.props.navigation.setParams({
          logout: this.logout,
          navigation: this.props.navigation,
          showLogoutButton: this.props.navigation.getParam('user', Firebase.shared().currentUser).uid === Firebase.shared().currentUser.uid
      });
    }

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Profile' },
            { key: '2', title: 'Projects' },
            { key: '3', title: 'Questions' },
            { key: '4', title: 'Ideas' },
        ],
        user: {
          photoURL: null
        }
    };

    logout(params) {
      Firebase.shared().auth.signOut().then(function() {
        console.log('Signed Out');
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        });
        params.navigation.dispatch(resetAction);
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }

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
                return <UserProfile user={this.state.user} />;
            case '2':
                return <Projects navigation={this.props.navigation} user={this.state.user} />;
            case '3':
                return <Questions navigation={this.props.navigation} user={this.state.user} />;
            case '4':
                return <Ideas user={this.state.user} />;
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
                        source={{uri: this.state.user.photoURL }}
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
