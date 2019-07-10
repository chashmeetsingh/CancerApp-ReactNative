import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import IdeaItem from './IdeaItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FirebaseSVC from "./FirebaseSVC";
import * as firebase from 'firebase';
import Dialog from "react-native-dialog";
import validate from './Validator'

export default class Ideas extends Component {

  state = {
    ideaList: [],
    idea: '',
    isDialogVisible: false,
  }

  componentDidMount() {
    this.currentUser = FirebaseSVC.shared().currentUser;
    this.getIdeas();
  }

  getIdeas() {
    firebase.database().ref('/users/' + this.currentUser.uid + '/ideas').on('value', snapshot => {
      if (snapshot.val() !== null) {
        var ideas = [];
        for (var id in snapshot.val()) {
          var idea = snapshot.val()[id];
          idea['key'] = id;
            ideas.push(idea);
        }
        this.setState({
          ideaList: ideas.reverse()
        })
      }
    })
  }

  addIdeaButtonPressed() {
    this.setState({
      isDialogVisible: true
    })
  }

  addButtonPressed() {
    const ideaError = validate('idea', this.state.idea);

    this.setState({
      ideaError: ideaError
    });

    if (ideaError) {
      return;
    }

    firebase.database().ref('/users/' + this.currentUser.uid + '/ideas').push({
      idea: this.state.idea
    }).then(() => {
      this.cancelButtonTapped()
    })
  }

  showDialog = (show) => {
    this.setState({
      isDialogVisible: show
    })
  }

  cancelButtonTapped() {
    this.setState({
      isDialogVisible: false,
      idea: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
            icon={
              <FontAwesomeIcon
                name="plus"
                size={17}
                color="white"
              />
            }
            title='Add Idea'
            buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10, margin: 8}}
            titleStyle={{color: 'white', marginLeft: 10}}
            onPress={() => this.addIdeaButtonPressed()}
        />
        <FlatList
          data={this.state.ideaList}
          renderItem={({item}) => <IdeaItem data={item} />}
        />
        <Dialog.Container visible={this.state.isDialogVisible}>
          <Dialog.Title>Add an idea</Dialog.Title>
          <Dialog.Input value={this.state.idea} onChangeText={(text) => this.setState({idea: text})}></Dialog.Input>
            {
              this.state.ideaError
              ? <Dialog.Description>
                Please enter an idea.
              </Dialog.Description>
              : null
            }
          <Dialog.Button label="Cancel" onPress={() => this.cancelButtonTapped()} />
        <Dialog.Button label="Add" onPress={() => this.addButtonPressed()} />
        </Dialog.Container>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  }
})
