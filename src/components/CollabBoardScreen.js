import React, {Component} from 'react'
import {ImageBackground, ScrollView, Text, View, FlatList, TouchableOpacity, Button, StyleSheet} from 'react-native'

import BulletinBoardImage from '../../assets/bulletin-board.jpg'
import CollabItem from "./CollabItem";

import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Dialog from "react-native-dialog";

export default class CollabBoardScreen extends Component {

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      // title: navigation.state.params.title,
      headerRight: <FontAwesomeIcon
                    name="plus"
                    style={{color: 'white', paddingRight: 14}}
                    size={22}
                    onPress={() => params.dialog(true)}
                />

    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      dialog: this.showDialog
    });

    this.getCollabs()
  }

  state = {
    collabs: [],
    isDialogVisible: false,
    topic: ''
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
        id: FirebaseSVC.shared().currentUser.uid
      }
    };
    firebase.database().ref('/collabs').orderByChild('name').equalTo(data.name).once('value', snapshot => {
      if (snapshot.val() === null) {
        firebase.database().ref('/collabs').push(data);
      }
      this.handleCancelDialog();
    })
  }

  handleCancelDialog() {
    this.setState({
      isDialogVisible: false,
      topic: ''
    })
  }

  getCollabs = () => {
    firebase.database().ref('/collabs').on('value', snapshot => {
      var collabs = [];
      for (var key in snapshot.val()) {
        var collab = snapshot.val()[key];
        collab['id'] = key;
        collabs.push(collab);
      }
      this.setState({
        collabs: collabs
      })
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
                return <CollabItem index={index} item={item} key={item.id} navigation={this.props.navigation} />
              })
            }
          </View>
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
            this.state.collabs.map((item, index) => {
              return <CollabItem index={index} item={item} key={item.id} navigation={this.props.navigation} />
            })
          }
        </View>
      </ScrollView>
      <Dialog.Container visible={this.state.isDialogVisible}>
        <Dialog.Title>Add a new topic</Dialog.Title>
        {/* <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description> */}
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
