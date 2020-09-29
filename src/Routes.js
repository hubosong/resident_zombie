import React, { useEffect } from 'react'
import { View } from 'react-native'

/** lib to store persistent data on the device */
import AsyncStorage from '@react-native-community/async-storage'

/** lib navigation - navigate between screens */
import { NavigationContainer   } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

/** screens */
import Main from './pages/Main'
import Register from './pages/Register'
import Presentation from './pages/Presentation'

const { Navigator, Screen } = createStackNavigator()

/** first route screen */
function Home({ navigation }) {
    /** used to find store data on device */
    async function _verifyDataAsyncStorage() {
        try {
           let d = JSON.parse(await AsyncStorage.getItem('dataSurvivor'))
           if(d.name != ''){
                navigation.replace('Main')
           } else{
                navigation.replace('Presentation')
           }
        } catch(error) { console.error(error) }
     }

     /** hook used to start function after screen is rendered */
     useEffect(() => {
        _verifyDataAsyncStorage()
     }, [])

    return (
        <View style={{flex: 1, backgroundColor: '#3C3F58'}}/>
    )
}

/** routes */
export default function Routes (){
    return (
       <NavigationContainer>
           <Navigator headerMode='none'>
               <Screen name='Home' component={Home} options={{gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerLeft: null}} />
               <Screen name='Presentation' component={Presentation} options={{gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
               <Screen name='Register' component={Register} options={{gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
               <Screen name='Main' component={Main} options={{gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
           </Navigator>
       </NavigationContainer>
    )
}