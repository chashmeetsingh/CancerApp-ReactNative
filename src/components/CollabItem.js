import React, {Component} from 'react'
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-elements'

import * as firebase from 'firebase';
import FirebaseSVC from "./FirebaseSVC";

export default class CollabItem extends Component {

    state = {
        itemStyle: {width: 10, height: 10},
        fontSize: 0,
    };

    handleItemPress = () => {
      console.log('pressed');
      this.getLatestArticles()
    }

    getLatestArticles() {
      const newData = {
        name: 'new fevere',
        createdAt: Date.now(),
        user: {
          id: FirebaseSVC.shared().currentUser.uid
        }
      };
      firebase.database().ref('/collabs').orderByChild('name').equalTo(newData.name).once('value', snapshot => {
        if (snapshot.val() === null) {
          firebase.database().ref('/collabs').push(newData);
        }
      })
    }

    componentDidMount() {
        this.setState({
            itemStyle: {
                width: this.dynamicStyles().width,
                height: this.dynamicStyles().height,
                margin: this.dynamicStyles().margin
            },
            fontSize: this.dynamicStyles().fontSize
        })
        console.log(this.props.item);
    }

    dynamicStyles = () => {
        let width = Dimensions.get('window').width;
        let height = 0;
        let fontSize = 0;
        let margin = 0;
        if (this.props.index === 0) {
            width = width - 16;
            height = width / 4;
            fontSize = 22;
            margin = 6;
        } else {
            width = width / 2 - 12;
            height = width / 2;
            fontSize = 14;
            margin = 3;
        }

        return {
            width: width,
            height: height,
            fontSize: fontSize,
            margin: margin
        }
    };

    render() {
        return (
            <TouchableOpacity style={{...styles.container, ...this.state.itemStyle}} onPress={this.handleItemPress}>
                <Text style={{fontSize: 17}}>#{this.props.item.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // width: '50%',
        backgroundColor: 'white',
        // margin: 3,
        // alignItems: 'center'
        borderRadius: 5,
        // padding: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
