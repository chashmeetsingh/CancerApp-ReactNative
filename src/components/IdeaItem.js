import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class IdeaItem extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.data.idea}</Text>
      </View>
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
