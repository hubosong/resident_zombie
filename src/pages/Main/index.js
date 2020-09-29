import React, { useState, useEffect } from 'react'
import { View, Alert, SafeAreaView, FlatList, Text, Image, ActivityIndicator, TouchableOpacity, BackHandler, TouchableWithoutFeedback } from 'react-native'

/** lib to store persistent data on the device */
import AsyncStorage from '@react-native-community/async-storage'

/** images */
import zombie_logo from '../../assets/images/zombie.png'

/** styles */
import styles from './styles'

export default function Main() {

    const [survivors, setSurvivors] = useState([])
    const [loading, setLoading] = useState(true)

    const itemsArray = [
        { id: 1, name: "Fiji Water", points: 14 },
        { id: 2, name: "Campbell Soup", points: 12 },
        { id: 3, name: "First Aid Pouch", points: 10 },
        { id: 4, name: "AK47", points: 8 }
    ]
    const [items, setItems] = useState(itemsArray)

    /** used to get data from JSON */
    function _handleGetJSON() {
        fetch('http://zssn-backend-example.herokuapp.com/api/people/')//f93d1d93-97db-4422-b621-c5f88f7c8727')
            .then((response) => response.json())
            .then((resJson) => {
                setSurvivors(resJson)
                setLoading(false)
            }).catch((error) => { console.error(error) })
        //console.log(survivors)
    }

    useEffect(() => {
        _handleGetJSON()
    }, [])

    /** used to reset store data on device */
    async function _resetDataAsyncStorage() {
        try {
            let dataSurvivor = { name: '', age: '', gender: '', lonlat: '' }
            await AsyncStorage.setItem('dataSurvivor', JSON.stringify(dataSurvivor))

            BackHandler.exitApp()
        } catch (error) { console.error(error) }
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={{ width: '100%' }} onPress={_resetDataAsyncStorage}>
                <Image source={zombie_logo} style={styles.banner} />
            </TouchableOpacity>

            <Text style={{ ...styles.title, ...styles.titleBold }}>
                Hi survivor!
            </Text>

            {/** list available items */}
            <Text style={{ ...styles.label, fontWeight: 'bold', marginTop: 20, marginBottom: 10, alignSelf: 'flex-start' }}>
                Your available items:
            </Text>
            <SafeAreaView
                style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...styles.label, width: '10%', textAlign: 'left', textDecorationLine: 'underline' }}>ID</Text>
                    <Text style={{ ...styles.label, width: '60%', textAlign: 'left', textDecorationLine: 'underline' }}>Name</Text>
                    <Text style={{ ...styles.label, width: '30%', textAlign: 'center', textDecorationLine: 'underline' }}>Points</Text>
                </View>
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ marginBottom: 10 }} />}
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback onPress={() => Alert.alert('Item:', item.name)}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.label, width: '10%', textAlign: 'left' }}>{item.id}</Text>
                                <Text style={{ ...styles.label, width: '60%', textAlign: 'left' }}>{item.name}</Text>
                                <Text style={{ ...styles.label, width: '30%', textAlign: 'center' }}>{item.points}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    } />
            </SafeAreaView >

            {/** list survivors */}
            <Text style={{ ...styles.label, fontWeight: 'bold', marginTop: 30, marginBottom: 10, alignSelf: 'flex-start' }}>
                Survivors:
            </Text>
            <SafeAreaView
                style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', opacity: loading ? 0 : 100 }}>
                    <Text style={{ ...styles.label, width: '60%', textAlign: 'left', textDecorationLine: 'underline' }}>Name</Text>
                    <Text style={{ ...styles.label, width: '20%', textAlign: 'center', textDecorationLine: 'underline' }}>Age</Text>
                    <Text style={{ ...styles.label, width: '20%', textAlign: 'center', textDecorationLine: 'underline' }}>Gender</Text>
                </View>
                <FlatList
                    data={survivors}
                    keyExtractor={(item) => item.location.toString()}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback onPress={() => Alert.alert('Survivor:', item.name)}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.label, width: '60%', textAlign: 'left' }}>{item.name}</Text>
                                <Text style={{ ...styles.label, width: '20%', textAlign: 'center' }}>{item.age}</Text>
                                <Text style={{ ...styles.label, width: '20%', textAlign: 'center' }}>{item.gender}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    } />                
                    <ActivityIndicator animating={loading} color='#3BBA9C' size="large" />
            </SafeAreaView >

        </View>
    )
}
