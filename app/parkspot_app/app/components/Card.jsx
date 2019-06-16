//React imports
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, Linking, Dimensions } from 'react-native'
import { Notifications } from 'expo'
import AppLink from 'react-native-app-link';

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

const { width } = Dimensions.get('window');

/**
 * @class Card
 * Styling and functionality for a card
 */
class Card extends Component {

  /**
   * @constructor
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.callParentfunction = this.callParentfunction.bind(this);
    this.state = {
      destinationAdress: "",
      parkingAddress: "",
    }
  }

  componentDidMount() {
    this.setState({
      destinationAdress: this.props.destination,
      parkingAddress: this.props.address
    })
  }

  /**
   * @function openWaze
   * Open's waze directly from our app with the correct destination
   */
  openWaze = () => {
    try {
      let address = this.props.address
      address.replace(/\s/g, "%20");
      Linking.openURL("https://waze.com/ul?q=" + address)
    }
    catch(error) {
      console.log(error)
    }
  }

  callParentfunction() {
    this.props.onClick(this.props.destination, this.props.address)
  }

  /**
   * @function render
   * @returns View of the Card
   */
  render() {

  return (
  <TouchableOpacity style={styles.cardStyle} onPress={this.callParentfunction}>
    <View style={styles.card} >
      <View style={styles.view}>
      <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
        <View>
          <Text style={styles.title}>{this.props.parkingName}</Text>
          <Text style={styles.subtitle}>{this.props.address}</Text>
        </View>
        <TouchableOpacity style={styles.routeButton} onPress={this.openWaze}>
          <Image
            style={{width: 36, height: 43}}
            source={require('../assets/routeBtn.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.listItemContainer_normal}>
          <View style={styles.listItemRowContainer}>
              <Text style={styles.itemName} >Price</Text>
              <Text style={styles.itemValue}>€{this.props.price}/hour</Text>
          </View>
      </View>

      <View style={styles.listItemContainer_normal}>
          <View style={styles.listItemRowContainer}>
              <Text style={styles.itemName} >Type</Text>
              <Text style={styles.itemValue}>{this.props.type}</Text>
          </View>
      </View>

      <View style={styles.listItemContainer_normal}>
          <View style={styles.listItemRowContainer}>
              <Text style={styles.itemName} >Open</Text>
              <Text style={styles.itemValue}>{this.props.openWhen}</Text>
          </View>
      </View>

      <View style={styles.listItemContainer_normal}>
          <View style={styles.listItemRowContainer}>
              <Text style={styles.itemName} >Free spot</Text>
              <Text style={styles.itemValue}>{this.props.chance}% chance</Text>
          </View>
      </View>

      </View>
    </View>
  </TouchableOpacity>
  );}
}

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the Card
 */
const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 600,
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 4.65,
    elevation: 1,
  },
  cardStyle: {
    width: width - 40,
    height: 264,
    borderRadius: 10,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20,
  },
  view: {
    width: "100%",
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  },
  listItemContainer_normal: {
    width:"100%",
    height:40,
    borderColor: 'rgba(112, 112, 112, 0.2)',
    borderTopWidth: 1,
},
listItemRowContainer: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: 20,
  paddingRight: 20,
},
lastItemContainer: {
  width:"100%",
  height:40,
  borderColor: 'rgba(112, 112, 112, 0.2)',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  marginBottom: 30,
  padding: 0,
},
subtitle: {
  fontSize: 16,
  width: "80%",
  fontWeight: '500',
  color: '#484848',
  marginLeft: 20,
  marginBottom: 15,
},
title: {
  fontSize: 20,
  fontWeight: '600',
  color: '#484848',
  marginLeft: 20,
  marginTop: 10,
},
itemName: {
  fontWeight: '600',
},
routeButton: {
  flexDirection:"row", 
  backgroundColor: "#4CD964", 
  width: 60, 
  height: 60, 
  alignSelf:"center",
  alignItems: "center",
  justifyContent: "space-around",
  margin:10,
  borderRadius: 10
},
itemValue: {
  marginRight:50,
},

})


export default Card
