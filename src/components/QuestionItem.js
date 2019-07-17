import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

export default class QuestionItem extends Component {

  handleItemPressed() {
    this.props.navigation.navigate('QuestionDetailView', {question: this.props.data})
  }

  render() {
    return (
        <TouchableOpacity style={styles.container} onPress={() => this.handleItemPressed()}>
          <Text>{this.props.data.question}</Text>
        </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 8,
    padding: 10
  }
})
