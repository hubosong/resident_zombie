import React, { useEffect } from 'react'
import { View, Text, Image, BackHandler } from 'react-native'

/** lib navigation - navigate between screens */
import { useNavigation, useRoute } from '@react-navigation/native'

//import { RNCamera } from "react-native-camera"

/** images */
import zombie_logo from '../../assets/images/zombie.png'
import register_icon from '../../assets/images/icons/register_icon.png'

/** component */
import Button from '../../components/Button'

/** styles */
import styles from './styles'

/** main function */
export default function Presentation() {

    /** used for navigation */
    const { navigate } = useNavigation()

    /** used to identify routes name */
    const route = useRoute()

    /** used to call register screen */
    function _handleNavigateToRegisterPage() {
        navigate('Register')
    }

    /** hook used to start function after screen is rendered */
    useEffect(() => {
        /*
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
          

        BackHandler.addEventListener('hardwareBackPress', handleBackButton.bind(this))            
        */

    }, [])

    /** used to call register screen */
    function _handleCamera() {
      alert('hello camera')
  }

    /** used to include elements to be rendered */
    return (
        <View style={styles.container}>

            <Image source={zombie_logo} style={styles.banner} />

            <Text style={styles.title}>
                Welcome! {'\n'}
                <Text style={styles.titleBold}>Identify yourself survivor.</Text>
            </Text>

            {/**
            <View style={styles.buttonsContainer}>
                <Button
                    onPress={_handleNavigateToRegisterPage}
                    style={[styles.button, styles.buttonPrimary]}
                    icon={register_icon}
                    textStyle={styles.buttonText}
                    buttonText='Register' />
            </View> */}

            <View style={styles.buttonsContainer}>
                <Button
                    onPress={_handleCamera}
                    style={[styles.button, styles.buttonPrimary]}
                    icon={register_icon}
                    textStyle={styles.buttonText}
                    buttonText='Camera' />
            </View>

        </View>
    )
}