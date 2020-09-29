import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Image, PermissionsAndroid } from 'react-native'

/** lib to picker effect */
import { Picker } from '@react-native-community/picker'

/** lib to store persistent data on the device */
import AsyncStorage from '@react-native-community/async-storage'

/** lib navigation - navigate between screens */
import { useNavigation } from '@react-navigation/native'

/** lib to get GPS localization */
import Geolocation from '@react-native-community/geolocation'

/** image */
import zombie_logo from '../../assets/images/zombie.png'

/** components */
import Button from '../../components/Button'
import Input from '../../components/Input'

/** styles */
import styles from './styles'

export default function Register() {

   /** used to declare states */
   const [name, setName] = useState('')
   const [age, setAge] = useState('')
   const [gender, setGender] = useState('M')
   const [lonlat, setLonLat] = useState('')
   const [hasGeoPermission, setHasGeoPermission] = useState(false)

   const { navigate, replace } = useNavigation()

   useEffect(() => {
      
      _handleVerifyGeoPermission()

      if(hasGeoPermission){
         _handleGetLocation()
      }      
      
   }, [hasGeoPermission])

   /** used to verify permission */
   async function _handleVerifyGeoPermission(){
      try{
         const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
         )
         if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log('permission granted')
            setHasGeoPermission(true)
         } else{
            console.log('permission denied')
            setHasGeoPermission(false)
         }
      }catch(err){ 
         console.warn(err) 
      }
   }

   /** used to get GPS current position */
   function _handleGetLocation() {
      Geolocation.getCurrentPosition(
         (pos) => {
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude

            /** used to tranform coordinates in dms */
            var deg = lat | 0
            var frac = Math.abs(lat - deg)
            var min = (frac * 60) | 0
            var sec = frac * 3600 - min * 60
            //const reslat = deg + "° " + min + "' " + sec.toFixed(3) + "\""
            const reslat = deg + min + sec.toFixed(3)

            var deg = lon | 0
            var frac = Math.abs(lon - deg)
            var min = (frac * 60) | 0
            var sec = frac * 3600 - min * 60
            //const resLon = deg + "° " + min + "' " + sec.toFixed(3) + "\""
            const resLon = deg + min + sec.toFixed(3)

            //'Point(-0000.111 1111.000)'
            //setLonLat('Point(' + resLon + ', ' + reslat + ')')
            setLonLat('Point(' + resLon + ' ' + reslat + ')')
         },
         (error) => alert("Please activate your GPS, wait a little and click Store data again.", error.message)
      )

      if (lonlat != '') {
         _handleRegister()
      }
   }

   /** used to call main screen */
   function _handleRegister() {
      if (name === '' || age === '') {
         alert('Please fill in all the fields.')
      } else if (lonlat === '') {
         _handleGetLocation()
      }
      else {
         _saveDataAsyncStorage()
         //navigate('Main')
         replace('Main')
      }

   }

   /** used to store data on device */
   async function _saveDataAsyncStorage() {
      try {
         let dataSurvivor = { name: name, age: age, gender: gender, lonlat: lonlat }
         await AsyncStorage.setItem('dataSurvivor', JSON.stringify(dataSurvivor))

         console.log('call handle..');
         _handlePostData()
      } catch (error) { console.error(error) }
   }

   /** used to send data to ws */
   function _handlePostData() {
      fetch('http://zssn-backend-example.herokuapp.com/api/people.json', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            name: name,
            age: age,
            gender: gender,
            lonlat: lonlat,
         })
      }).then((response) => response.json())
         .then((responseJson) => {
            console.log('>> ' + responseJson);
         }).catch((error) => {
            console.log('Error ' + error);
         })
   }

   return (
      <View style={styles.container}>

         <Image source={zombie_logo} style={styles.banner} />

         <Text style={styles.title}>
            Make your registration {'\n'}
            <Text style={styles.titleBold}>Survivor.</Text>
         </Text>

         <View style={styles.inputContainer}>
            <Input
               label='Name'
               labelStyle={styles.label}
               style={styles.input}
               value={name}
               onChangeText={text => setName(text)}
               placeholder='Enter with your name..'
               placeholderTextColor='#c1bccc' />
            <View style={styles.inputGroup}>
               <View style={styles.inputBlock}>
                  <Input
                     label='Age'
                     labelStyle={styles.label}
                     style={styles.input}
                     value={age}
                     keyboardType='numeric'
                     onChangeText={text => setAge(text)}
                     placeholder='your age..'
                     placeholderTextColor='#c1bccc' />
               </View>
               <View style={styles.inputBlock}>
                  <Text style={styles.label}>Gender</Text>
                  <View style={styles.input}>
                     <Picker
                        selectedValue={gender}
                        style={{ color: '#43455C' }}
                        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                        <Picker.Item label="M" value="M" />
                        <Picker.Item label="F" value="F" />
                     </Picker>
                  </View>
               </View>
            </View>

            <Text style={styles.label}>Coords: {lonlat}</Text>

            <Button
               onPress={_handleRegister}
               style={styles.submitButton}
               textStyle={styles.submitButtonText}
               buttonText='Store data' />
         </View>

      </View>
   )
}
