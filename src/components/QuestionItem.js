import React, {Component} from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

export default class QuestionItem extends Component {

  render() {
    return (
      <TouchableOpacity style={styles.container}>
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
