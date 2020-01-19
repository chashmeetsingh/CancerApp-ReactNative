import React, {Component} from 'react'
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native'

import BulletinBoardImage from '../../assets/bulletin-board.jpg'
import CollabItem from "./CollabItem";

import * as firebase from 'firebase';
import Firebase from "./FirebaseSVC";

import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Dialog from "react-native-dialog";

export default class CollabBoardScreen extends Component {

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      // title: navigation.state.params.title,
      headerRight: <AntDesignIcon
          name="plus"
          style={{color: 'white', paddingRight: 14}}
          size={22}
          onPress={() => params.dialog(true)}
      />

    };
  };

  componentDidMount() {
    this.mounted = true
    this.props.navigation.setParams({
      dialog: this.showDialog
    });

    this.getCollabs()
  }

  componentWillUnmount(){
    this.mounted = false
  }

  state = {
    collabs: [],
    pasWeekCollabs: [],
    isDialogVisible: false,
    topic: '',
    topicExists: false
  };

  showDialog = (show) => {
    this.setState({
      isDialogVisible: show
    })
  }

  handleAddCollab() {
    const data = {
      name: this.state.topic,
      createdAt: Date.now(),
      user: {
        id: Firebase.shared().currentUser.uid
      },
      updatedAt: Date.now(),
      hits: 1
    };
    this.mounted && Firebase.shared().collabs().where("name", "==", data.name).limit(1).get().then(query => {
      if (query.docs.length === 0) {
        Firebase.shared().collabs().add(data);
        this.showDialog(false);
        this.setState({
          topicExists: false
        });
      } else {
        this.setState({
          topicExists: true
        });
      }
    })
  }

  getCollabs = () => {
    this.mounted && Firebase
    .shared()
    .collabs()
    .orderBy('hits', 'desc')
    .orderBy('updatedAt', 'desc')
    .limit(7)
    .get()
    .then(query => {
      for (var doc in query.docs) {
        let data = query.docs[doc].data()
        data['key'] = query.docs[doc].id
        this.setState(prevState => ({
          collabs: [...prevState.collabs, data]
        }));
      }
    })


    var sevenDaysAgo = Date.now() - (24*60*60*1000*7)
    this.mounted && Firebase
    .shared()
    .collabs()
    .where("updatedAt", "<=", Date.now())
    .where("updatedAt", ">=", sevenDaysAgo)
    .orderBy('updatedAt', 'desc')
    .orderBy('hits', 'desc')
    .limit(7)
    .get()
    .then(query => {
      for (var doc in query.docs) {
        let data = query.docs[doc].data()
        data['key'] = query.docs[doc].id
        this.setState(prevState => ({
          pasWeekCollabs: [...prevState.pasWeekCollabs, data]
        }));
      }
    })
  }

  render() {
    return (
        <ImageBackground style={{width: '100%', height: '100%'}} source={BulletinBoardImage}>
          <ScrollView style={{flex: 1}}>
            <View style={{
              flexWrap: 'wrap',
              flex: 1,
              flexDirection: 'row',
              padding: 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {
                this.state.collabs.map((item, index) => {
                  return <CollabItem index={index} item={item} key={item.key} navigation={this.props.navigation} />
                })
              }
            </View>
            {
              this.state.pasWeekCollabs.length > 0
              ? <View>
                  <Text style={{margin: 10, fontSize: 18, fontWeight: 'bold', color: 'white'}}>Past Week</Text>
                  <View style={{
                    flexWrap: 'wrap',
                    flex: 1,
                    flexDirection: 'row',
                    padding: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {
                      this.state.pasWeekCollabs.map((item, index) => {
                        return <CollabItem index={index} item={item} key={item.key} navigation={this.props.navigation} />
                      })
                    }
                  </View>
                </View> : null
            }
          </ScrollView>
          <Dialog.Container visible={this.state.isDialogVisible}>
            <Dialog.Title>Add a new topic</Dialog.Title>
            {
              this.state.topicExists
                  ? <Dialog.Description>
                    Topic already exists.
                  </Dialog.Description>
                  : null
            }
            <Dialog.Input onChangeText={(text) => this.setState({topic: text})}></Dialog.Input>
            <Dialog.Button label="Cancel" onPress={() => this.showDialog(false)} />
            <Dialog.Button label="Add" onPress={() => this.handleAddCollab()} />
          </Dialog.Container>

        </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingRight: 12,
    // backgroundColor: 'red'
  },
  icon: {
    color: 'white'
  }
})
