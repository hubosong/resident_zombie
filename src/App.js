import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import Routes from './Routes'

import SplashScreen from 'react-native-splash-screen'

export default function App() {
    
    useEffect (() => {
        SplashScreen.hide()
    },[])

    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'} barStyle='light-content' />
            <Routes />
        </>
    )
}
