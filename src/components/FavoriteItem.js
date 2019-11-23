import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {Button} from "react-native-elements";

import * as firebase from 'firebase';
import Firebase from "./FirebaseSVC";

export default class FavoriteItem extends Component {

  state = {
  };

    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <View style={{ dislay: 'flex', flexDirection: 'column', marginBottom: 4 }}>
                        <Text style={{fontWeight: "bold"}}>Event Name:</Text>
                        <Text>{this.props.event.eventName}</Text>
                    </View>
                    <View style={{ dislay: 'flex', flexDirection: 'column', marginBottom: 4 }}>
                        <Text style={{fontWeight: "bold"}}>Location:</Text>
                        <Text>{this.props.event.eventLocation}</Text>
                    </View>
                    <View style={{ dislay: 'flex', flexDirection: 'column' }}>
                        <Text style={{fontWeight: "bold"}}>Description:</Text>
                        <Text>{this.props.event.eventDescription}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 8,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        flex: 1,
        elevation: 1,
        borderWidth: 0.1,
        borderRadius: 4,
        borderColor: '#eee',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0.5},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        padding: 10
    },
    innerContainer: {
        flexDirection: 'column',
        margin: 4,
        flex: 2
    },
    buttonsView: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
        flex: 1,
        width: '100%',
    }
});
