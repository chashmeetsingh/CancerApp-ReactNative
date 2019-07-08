import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class ProjectItem extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.data.url}</Text>
      </View>
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
