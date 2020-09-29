import React from 'react'
import { Text, TextInput } from 'react-native'

export default function Input(props) {
    return (
        <>
            <Text style={props.labelStyle}>{props.label}</Text>
            <TextInput
                style={props.style}
                value={props.value}
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}/>
        </>
    )
}