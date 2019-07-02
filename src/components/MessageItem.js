import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export default class MessageItem extends Component {

    handleMessageItemPressed = () => {
        console.log('tap: ' + this.props.user.name);
        const {navigate} = this.props.navigation;
        navigate('MessageDetailView', {user: this.props.user});
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.handleMessageItemPressed()}>
                <Text style={styles.name}>{this.props.user.name}</Text>
                <IoniconsIcon
                    name="ios-arrow-forward"
                    style={{color: 'gray'}}
                    size={24}
                />
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 17
    }
});