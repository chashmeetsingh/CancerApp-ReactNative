import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import QuestionItem from './QuestionItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FirebaseSVC from "./FirebaseSVC";
import * as firebase from 'firebase';
import Dialog from "react-native-dialog";
import validate from './Validator'

export default class Question extends Component {

  state = {
    questionList: [],
    question: '',
    isDialogVisible: false,
  }

  componentDidMount() {
    this.currentUser = FirebaseSVC.shared().currentUser;
    this.getQuestions();
  }

  getQuestions() {
    firebase.database().ref('/users/' + this.currentUser.uid + '/questions').on('value', snapshot => {
      if (snapshot.val() !== null) {
        var questions = [];
        for (var id in snapshot.val()) {
          var question = snapshot.val()[id];
          question['key'] = id;
            questions.push(question);
        }
        this.setState({
          questionList: questions.reverse()
        })
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

    firebase.database().ref('/users/' + this.currentUser.uid + '/questions').push({
      question: this.state.question
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
        <Button
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
        <FlatList
          data={this.state.questionList}
          renderItem={({item}) => <QuestionItem data={item} />}
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
