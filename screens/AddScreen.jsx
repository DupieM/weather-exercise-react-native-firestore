import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'; //a lot of other cool pickers available rather than this one
import React, { useEffect, useState } from 'react'
import { addReading, getAllDays } from '../services/FirestoreServices';
import { Timestamp } from 'firebase/firestore';

const AddScreen = ({navigation}) => {

    const [temperature, setTemp] = useState("")
    const [selectedDay, setSelectedDay] = useState("")

    const handleCreation = async () => {
        // Create new reading for the specific day
        //1. create my data that needs to be added
        var reading = {
            temp: temperature,
            time: Timestamp.now()
        }

        //2. call my firebase function
        var success = await addReading(selectedDay, reading) //true or false based on the tryCatch

        if(success){
            navigation.goBack()
        }
    }

    useEffect(() => {
        handleGettingdays()
    }, [])

    const [days, setDays] = useState([]);

    const handleGettingdays = async () => {
        var daysdata = await getAllDays();
        setDays(daysdata);
    }

  return (
    <View style={styles.container}>

        <Picker
            style={styles.inputField}
            selectedValue={selectedDay}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedDay(itemValue)
            }>
                {/* Update to data from db */}
                {days != [] ? (
                    days.map((day) => (
                        <Picker.Item key={day.id} label={day.name} value={day.id} />
                    ))
                ) : null }
                
            
        </Picker>

        <TextInput
            style={styles.inputField}
            placeholder="Temperature"
            onChangeText={newText => setTemp(newText)}
            defaultValue={temperature}
        />      

        <TouchableOpacity style={styles.button} onPress={handleCreation} >
            <Text style={styles.buttonText}>Add Reading</Text>
        </TouchableOpacity>
    
    </View>  

  )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "black",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
})