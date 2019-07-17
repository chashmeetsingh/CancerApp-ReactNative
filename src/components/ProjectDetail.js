import React, {Component} from 'react'
import {FlatList, StyleSheet, View, YellowBox} from 'react-native'
import {FloatingAction} from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import Dialog from "react-native-dialog";
import validate from './Validator'
import * as firebase from 'firebase';
import Firebase from "./FirebaseSVC";
import ProjectDetailItem from './ProjectDetailItem'

export default class ProjectDetail extends Component {

  state = {
    currentItem: 'Idea',
    isDialogVisible: false,
    dataList: []
  }

  componentDidMount(){
    this.mounted = true
    this.project = this.props.navigation.getParam('project')
    this.currentUser = Firebase.shared().currentUser
    this.getData()
    YellowBox.ignoreWarnings(['Warning: Failed prop type']);
  }

  componentWillUnmount(){
    this.mounted = false
  }

  addButtonTapped() {
    const dataError = validate('projectData', this.state.data)

    this.setState({
      dataError: dataError
    });

    if (dataError) {
      return
    }

    this.mounted && Firebase.shared().project(this.project.key).collection('data').add({
      text: this.state.data,
      type: this.state.currentItem,
      createdAt: Date.now()
    }).then(() => {
      this.cancelButtonTapped()
    })


    // firebase.database().ref('/users/' + this.currentUser.uid + '/projects/' + this.project.key + '/data').push({
    //   text: this.state.data,
    //   type: this.state.currentItem
    // })
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
      currentItem: '',
      dataError: null,
      data: ''
    })
  }

  getData() {
    this.mounted && Firebase.shared().project(this.project.key).collection('data').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      this.setState({dataList: []});
      for (var doc in snapshot.docs) {
        let data = snapshot.docs[doc].data();
        data['key'] = snapshot.docs[doc].id;
        this.setState(prevState => ({
          dataList: [...prevState.dataList, data]
        }))
      }
    })

    // firebase.database().ref('/users/' + this.currentUser.uid + '/projects/' + this.project.key + '/data').on('value', snapshot => {
    //   var dataList = [];
    //   if (snapshot.val() !== null) {
    //     for (var key in snapshot.val()) {
    //       var data = snapshot.val()[key];
    //       data['key'] = key;
    //       dataList.push(data);
    //     }
    //   }
    //   this.setState({
    //     dataList: dataList.reverse()
    //   });
    // })
  }

  render() {

    const actions = [
      {
        text: "New Idea",
        icon: <Icon
            name="lightbulb-o"
            size={22}
            color="white"
        />,
        name: "idea",
        position: 1,
        color: '#00BCD4'
      },
      {
        text: "New Thought",
        icon: <MIcon
            name="thought-bubble"
            size={22}
            color="white"
        />,
        name: "thought",
        position: 2,
        color: '#00BCD4'
      },
      {
        text: "New Issue",
        icon: <OIcon
            name="issue-opened"
            size={22}
            color="white"
        />,
        name: "issue",
        position: 3,
        color: '#00BCD4'
      }
    ];

    return (
        <View style={styles.container}>
          <FlatList
              data={this.state.dataList}
              renderItem={({item}) => <ProjectDetailItem data={item} />}
              keyExtractor={(item) => item.key}
          />
          <Dialog.Container visible={this.state.isDialogVisible}>
            <Dialog.Title>Add {this.state.currentItem === 'thought' ? "a" : "an"} {this.state.currentItem}</Dialog.Title>
            <Dialog.Input value={this.state.data} onChangeText={(text) => this.setState({data: text.toLowerCase()})}></Dialog.Input>
            <Dialog.Button label="Cancel" onPress={() => this.cancelButtonTapped()} />
            <Dialog.Button label="Add" onPress={() => this.addButtonTapped()} />
            {
              this.state.dataError
                  ? <Dialog.Description>
                    Please enter {this.state.currentItem === 'thought' ? "a" : "an"} {this.state.currentItem}
                  </Dialog.Description>
                  : null
            }
          </Dialog.Container>
          <FloatingAction
              actions={actions}
              onPressItem={name => {
                this.setState({currentItem: `${name}`, isDialogVisible: true});
              }}
              color="#00BCD4"
          />
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 2
  }
})
