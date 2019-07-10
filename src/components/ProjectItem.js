import React, {Component} from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

export default class ProjectItem extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Text>{this.props.data.url}</Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    padding: 12
  }
})
