import React, {Component} from 'react'
import {Text, ScrollView, StyleSheet, FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FirebaseSVC from "./FirebaseSVC";
import Dialog from "react-native-dialog";
import * as firebase from 'firebase';
import ProjectItem from './ProjectItem'
import validate from './Validator'

export default class Projects extends Component {

  state = {
    projectURL: '',
    isDialogVisible: false,
    projectList: []
  }

  componentDidMount() {
    this.currentUser = FirebaseSVC.shared().currentUser;
    this.getProjectList()
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

    firebase.database().ref('/users/' + this.currentUser.uid + '/projects').push({
      url: this.state.projectURL
    })
    this.cancelButtonTapped()
  }

  showDialog = (show) => {
    this.setState({
      isDialogVisible: show
    })
  }

  cancelButtonTapped() {
    this.setState({
      isDialogVisible: false,
      projectURL: ''
    })
  }

  getProjectList() {
    firebase.database().ref('/users/' + this.currentUser.uid + '/projects').on('value', snapshot => {
      if (snapshot.val() !== null) {
        var projectURLs = [];
        for (var id in snapshot.val()) {
          var url = snapshot.val()[id];
          url['key'] = id;
            projectURLs.push(url);
        }
        this.setState({
          projectList: projectURLs.reverse()
        })
      }
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
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
        <FlatList
          data={this.state.projectList}
          renderItem={({item}) => <ProjectItem data={item} />}
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
