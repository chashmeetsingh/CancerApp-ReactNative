import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class CalendarScreen extends Component {

  render() {

    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key:'workout', color: 'green'};

    openCalendarDetailView = () => {
      this.props.navigation.navigate('CalendarStack');
    };

    return (
      <View style={styles.outerContainer}>
        <CalendarList
          markedDates={{
            '2019-12-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
            '2019-12-26': {dots: [massage, workout]}
          }}
          markingType={'multi-dot'}
          firstDay={1}
          onDayPress={this.openCalendarDetailView}
          style={styles.outerContainer}
          theme={{
            backgroundColor: '#FDD12B',
            calendarBackground: '#FDD12B',
            selectedDayBackgroundColor: '#F58015',
            selectedDayTextColor: 'blue',
            dayTextColor: '#424242',
          }}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#FDD12B'
  }
});
