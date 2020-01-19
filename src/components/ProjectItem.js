import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

export default class ProjectItem extends Component {

  projectItemPressed() {
    console.log(this.props.user);
    this.props.navigation.navigate('ProjectDetailView', {project: this.props.data, user: this.props.user})
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
