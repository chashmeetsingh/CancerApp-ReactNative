import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MostRecent from './MostRecent'
import MostRelative from './MostRelative'
import MostPopular from './MostPopular'

import {TabBar, TabView,} from 'react-native-tab-view';

export default class MatchesScreen extends Component {

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Most Recent' },
            { key: '2', title: 'Most Relevant' },
            { key: '3', title: 'Most Popular' },
        ],
    };

    handleIndexChange = (index) => {
        this.setState({
            index,
        });
    }

    renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            labelStyle={styles.label}
        />
    );

    renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <MostRecent navigation={this.props.navigation} />;
            case '2':
                return <MostRelative navigation={this.props.navigation} />;
            case '3':
                return <MostPopular navigation={this.props.navigation} />;
            default:
                return null;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    renderTabBar={this.renderTabBar}
                    onIndexChange={this.handleIndexChange}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    tabbar: {
        backgroundColor: '#00BCD4',
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: '#008080',
        height: 4
    },
    label: {
        color: '#fff',
        fontWeight: '400',
    },
});
