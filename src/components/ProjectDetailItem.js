import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import OIcon from 'react-native-vector-icons/Octicons';

export default class ProjectDetailItem extends Component {

  render() {
    return (
        <View style={styles.container}>
          {
            this.props.data.type === 'idea'
                ? <Icon
                    name="lightbulb-o"
                    size={22}
                    color="#ffde03"
                />
                : this.props.data.type === 'thought'
                ? <EIcon
                    name="icloud"
                    size={18}
                    color="black"
                />
                : <OIcon
                    name="issue-opened"
                    size={22}
                    color="red"
                />
          }
          <Text style={{marginLeft: 8, marginRight: 8, fontSize: 16, color: 'gray', fontWeight: '700'}}>{this.props.data.text}</Text>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
