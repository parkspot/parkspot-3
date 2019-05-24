import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native'
import { LinearGradient, Notifications } from 'expo'
import { exellentCardGradient, okayCardGradient, stressGradient, anxiousGradient, exhaustedGradient } from '../styles/components'



/**
 * Cancel the scheduled notification
 */
const cancelNotification = async () => {
  try {
    await Notifications.cancelScheduledNotificationAsync()
  } catch (error) {
    console.log(error)
  }
}




const routeToDestination = async (rating, navigation, route) => {

}

const Card = ({ text }) => (
  <TouchableOpacity style={styles.cardStyle} >
    <LinearGradient style={styles.card} colors={okayCardGradient}>
      <View style={styles.view}>

        <Text style={styles.text}>{text}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  cardStyle: {
    width: 300,
    height: '100%',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 10,

  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10
  }
})


export default Card
