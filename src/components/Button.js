import React from 'react'
import { Text, Image } from 'react-native'

/** lib navigation - button with little ripple effect */
import { RectButton } from 'react-native-gesture-handler'

export default function Button(props) {
    return (
        <RectButton
            onPress={props.onPress}
            style={props.style}>
            <Image source={props.icon} />
            <Text style={props.textStyle}>{props.buttonText}</Text>
        </RectButton>
    )
}