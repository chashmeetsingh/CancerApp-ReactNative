import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {Button} from 'react-native-elements'
import QuestionItem from './QuestionItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Firebase from "./FirebaseSVC";
import * as firebase from 'firebase';
import Dialog from "react-native-dialog";
import validate from './Validator'

export default class Question extends Component {

  state = {
    questionList: [],
    question: '',
    isDialogVisible: false,
    user: {
      uid: ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      user: nextProps.user !== undefined ? nextProps.user : Firebase.shared().user
    }, () => {
      this.getQuestions()
    });
  }

  getQuestions() {
    Firebase.shared().questions().where("uid", "==", this.state.user.uid).orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      this.setState({questionList: []});
      for (var doc in snapshot.docs) {
        let data = snapshot.docs[doc].data();
        data['key'] = snapshot.docs[doc].id;
        this.setState(prevState => ({
          questionList: [...prevState.questionList, data]
        }));
      }
    })
  }

  addQuestionButtonPressed() {
    this.setState({
      isDialogVisible: true
    })
  }

  addButtonPressed() {
    const questionError = validate('question', this.state.question)

    this.setState({
      questionError: questionError
    });

    if (questionError) {
      return
    }

    Firebase.shared().questions().add({
      question: this.state.question,
      createdAt: Date.now(),
      uid: this.currentUser.uid
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
      question: ''
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
                title='Add Question'
                buttonStyle={{backgroundColor: '#00BCD4', borderRadius: 10, margin: 8}}
                titleStyle={{color: 'white', marginLeft: 10}}
                onPress={() => this.addQuestionButtonPressed()}
            />
            : null
          }
          <FlatList
              data={this.state.questionList}
              renderItem={({item}) => <QuestionItem data={item} navigation={this.props.navigation} />}
          />
          <Dialog.Container visible={this.state.isDialogVisible}>
            <Dialog.Title>Add a question</Dialog.Title>
            <Dialog.Input value={this.state.question} onChangeText={(text) => this.setState({question: text})}></Dialog.Input>
            {
              this.state.questionError
                  ? <Dialog.Description>
                    Please enter a question.
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
