import React from 'react'
import { View, Text } from 'react-native'
import {Input} from 'react-native-elements'

const ValidatorTextField = props => (
    <View>
        <Input
            {...props}
            inputContainerStyle={{borderWidth: 0.5, borderColor: '#BDBDBD', borderRadius: 10, backgroundColor: 'white'}}
            containerStyle={{alignItems: 'center', justifyContent: 'center', margin: 4}}
            inputStyle={{color: 'black', paddingLeft: 8, fontSize: 14, height: 20}}
            autoCompleteType='off'
        />
        {
            props.error &&
            <Text style={{color: 'red', paddingLeft: 16, fontSize: 12}}>{props.error}</Text>
        }
    </View>
)

export default ValidatorTextField
