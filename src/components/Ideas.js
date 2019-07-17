import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {Button} from 'react-native-elements'
import IdeaItem from './IdeaItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Firebase from "./FirebaseSVC";
import * as firebase from 'firebase';
import Dialog from "react-native-dialog";
import validate from './Validator'

export default class Ideas extends Component {

  state = {
    ideaList: [],
    idea: '',
    isDialogVisible: false,
    user: {
      uid: ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      user: nextProps.user !== undefined ? nextProps.user : Firebase.shared().currentUser
    }, () => {
      this.getIdeas()
    });
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount(){
    this.mounted = false
  }

  getIdeas() {
    this.mounted && Firebase.shared().ideas().where("uid", "==", this.state.user.uid).orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      this.setState({ideaList: []});
      for (var doc in snapshot.docs) {
        let data = snapshot.docs[doc].data();
        data['key'] = snapshot.docs[doc].id;
        this.setState(prevState => ({
          ideaList: [...prevState.ideaList, data]
        }));
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

    Firebase.shared().ideas().add({
      idea: this.state.idea,
      createdAt: Date.now(),
      uid: this.state.user.uid
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
          {
            this.state.user.uid === Firebase.shared().currentUser.uid
            ? <Button
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
            : null
          }
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
