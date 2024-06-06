import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReadingCard from './ReadingCard'
import { getAllDays } from '../services/FirestoreServices'

const ReadingScreen = ({navigation}) => {

  // Get all Days
  var dummyReading = {name: "Monday", icon: "sun", id: "123456789"}

  useEffect(() => {
    handleGettingdays()
  }, []) //<- running the get here so that it gets called when our screen loads

  const [days, setDays] = useState([]);

  const handleGettingdays = async () => {
    var daysdata = await getAllDays();
    setDays(daysdata); //<- setting our useState equal to the data we get from firebase
  }


  return (
    <View style={styles.container}>
      <Button title='Add Reading' onPress={() => navigation.navigate("Add")} />

      {/* get all the days and display them here using the reading card */}
      
      {days != [] ? (
        days.map((day) => (
          <ReadingCard day={day} key={day.id} />
        ))
      ) : null}
      

    </View>
  )
}

export default ReadingScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})