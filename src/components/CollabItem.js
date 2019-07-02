import React, {Component} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-elements'

export default class CollabItem extends Component {

    state = {
        itemStyle: {width: 10, height: 10},
        fontSize: 0,
    };

    componentDidMount() {
        console.log(this.dynamicStyles().width, this.dynamicStyles().height);
        this.setState({
            itemStyle: {
                width: this.dynamicStyles().width,
                height: this.dynamicStyles().height,
                margin: this.dynamicStyles().margin
            }, fontSize: this.dynamicStyles().fontSize
        }, () => {
            // console.log(this.state.itemStyle)
        })
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
            <View style={{...styles.container, ...this.state.itemStyle}}>
                <Text style={{fontSize: 17}}>Article {this.props.index}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // width: '50%',
        backgroundColor: 'white',
        margin: 3,
        // alignItems: 'center'
        borderRadius: 5,
        // padding: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
});