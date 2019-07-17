import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

export default class ProjectItem extends Component {

  projectItemPressed() {
    this.props.navigation.navigate('ProfileDetailView', {project: this.props.data})
  }

  render() {
    return (
        <TouchableOpacity style={styles.container} onPress={() => this.projectItemPressed()}>
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
