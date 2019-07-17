import React, {Component} from 'react'
import {FlatList, ScrollView, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Firebase from "./FirebaseSVC";
import Dialog from "react-native-dialog";
import * as firebase from 'firebase';
import ProjectItem from './ProjectItem'
import validate from './Validator'

export default class Projects extends Component {

  state = {
    projectURL: '',
    isDialogVisible: false,
    projectList: [],
    user: {
      uid: ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      user: nextProps.user !== undefined ? nextProps.user : Firebase.shared().currentUser
    }, () => {
      this.getProjectList();
    });
  }

  addProjectButtonPressed() {
    this.showDialog(true)
  }

  addButtonTapped() {
    const urlError = validate('projectURL', this.state.projectURL)

    this.setState({
      urlError: urlError
    });

    if (urlError) {
      return
    }

    Firebase.shared().projects().add({
      url: this.state.projectURL,
      createdAt: Date.now(),
      uid: this.state.user.uid
    }).then(() => {
      this.cancelButtonTapped()
    })

    // firebase.database().ref('/users/' + this.currentUser.uid + '/projects').push({
    //   url: this.state.projectURL
    // });
    // this.cancelButtonTapped()
  }

  showDialog = (show) => {
    this.setState({
      isDialogVisible: show
    })
  }

  cancelButtonTapped() {
    this.setState({
      isDialogVisible: false,
      projectURL: '',
      urlError: null
    })
  }

  getProjectList() {
    Firebase.shared().projects().where("uid", "==", this.state.user.uid).orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      this.setState({projectList: []});
      for (var doc in snapshot.docs) {
        let data = snapshot.docs[doc].data();
        data['key'] = snapshot.docs[doc].id;
        this.setState(prevState => ({
          projectList: [...prevState.projectList, data]
        }));
      }
    })
  }

  render() {
    return (
        <ScrollView style={styles.container}>
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
                title='Add Project'
                buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10, margin: 8}}
                titleStyle={{color: 'white', marginLeft: 10}}
                onPress={() => this.addProjectButtonPressed()}
            />
            : null
          }
          <FlatList
              data={this.state.projectList}
              renderItem={({item}) => <ProjectItem data={item} navigation={this.props.navigation} />}
              keyExtractor={(item) => item.key}
          />
          <Dialog.Container visible={this.state.isDialogVisible}>
            <Dialog.Title>Add project url</Dialog.Title>
            <Dialog.Input value={this.state.projectURL} onChangeText={(text) => this.setState({projectURL: text.toLowerCase()})}></Dialog.Input>
            {
              this.state.urlError
                  ? <Dialog.Description>
                    Invalid URL
                  </Dialog.Description>
                  : null
            }
            <Dialog.Button label="Cancel" onPress={() => this.cancelButtonTapped()} />
            <Dialog.Button label="Add" onPress={() => this.addButtonTapped()} />
          </Dialog.Container>
        </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  }
})
