import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView,AsyncStorage, Dimensions } from 'react-native'

import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'
import Favorites from '../components/Favorites'
import Preferences from '../components/Preferences'
import {LogOutButton} from '../components/Buttons'


const { width } = Dimensions.get('window');

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.mapElement = React.createRef();
        this.state = {
            cardDisplay: "none",
            destination: {},
        }
    }
    getResultsFromAPI = async(zone, price, distance, bancontact, lez, underground) => {
        const url = "http://192.168.5.136:8080/api/v1/searchparkingspots"

        var data = {
            "destinationGeo": {
                "long": this.state.destination.lng,
                "lat": this.state.destination.lat
                },
            "userEmail": this._retrieveDataFromAsyncStorage("userId"),
            "settings": {
                "zonename": zone,
                "price_per_hour" : price,
                "distance_from_destination" : distance,
                "bankcontact" : bancontact,
                "low_emission_zone" : lez,
                "underground" : underground
                }
        }
        
        await fetch(url, {
          method: 'GET', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    }

    getDestCoordinates(destinationAddress){
        fetch("https://api.opencagedata.com/geocode/v1/json?q=" + destinationAddress + "&key=4fd9b61b904e466b8256aa5b4c04cb7b")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            destination: responseJson["results"][0]["geometry"]
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    showCards = (zone, price, distance, bancontact, lez, underground) => {
        this.getResultsFromAPI(zone, price, distance, bancontact, lez, underground)
        this.setState({cardDisplay: "flex"})
    }

    showPreferences = (destinationAddress) => {
        this.getDestCoordinates(destinationAddress)
        this.refs.prefElement.showPrefPanel()
    }

    showMarkers = async(destinationAddress, parkingAddress) => {
        await this.mapElement.current
        this.mapElement.current.updateMarkers(destinationAddress, parkingAddress)
    }

    async _removeItemValue(key) {
        try {
          await AsyncStorage.removeItem(key);
          return true;
        }
        catch(exception) {
          return false;
        }
    }

    async _retrieveDataFromAsyncStorage(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
            // We have data!!
            console.log(value);
            return true
          } else {
              return false
          }
        } catch (error) {
            // Error retrieving data
            console.error(error)
        }
    }

    componentDidMount() {
		setTimeout(() => {this.scrollView.scrollTo({x: -10}) }, 1) // scroll view position fix
	}

    render() {
        this._removeItemValue("userToken") 
        return (
            <View style={styles.container}>
                <LogOutButton />
                <Map  ref={this.mapElement}/>
                <KeyboardAvoidingView style={styles.cardContainer} behavior="padding" enabled keyboardVerticalOffset={70}>
                    <ScrollView ref={(scrollView) => { this.scrollView = scrollView; }} horizontal={true} decelerationRate={0} snapToInterval={width - 20} snapToAlignment={"center"} showsHorizontalScrollIndicator={false}
                    contentInset={{
                        top: 0,
                        left: 10,
                        bottom: 0,
                        right: 10,
                    }} style={{display: this.state.cardDisplay}}>
                        <Card
                            onClick={this.showMarkers}
                            destination={"sassevaartstraat 46, Gent"}
                            parkingName={"Parking Savaanstraat (P4)"}
                            address={"Savaanstraat 13, 9000 Gent"}
                            price={"€2,50/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"86% chance"}
                            />
                        <Card 
                            onClick={this.showMarkers}
                            destination={"sassevaartstraat 46, Gent"}
                            parkingName={"Interparking Gent Zuid"}
                            address={"Franklin Rooseveltlaan 3/A, 9000 Gent"}
                            price={"€3,00/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"34% chance"}
                            />
                        <Card 
                            onClick={this.showMarkers}
                            destination={"sassevaartstraat 46, Gent"}
                            parkingName={"Parking Vrijdagmarkt (P1)"}
                            address={"Vrijdagmarkt 1, 9000 Gent"}
                            price={"€2,00/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"97% chance"}
                            />
                            <Card 
                            onClick={this.showMarkers}
                            destination={"sassevaartstraat 46, Gent"}
                            parkingName={"Parking Vrijdagmarkt (P1)"}
                            address={"Vrijdagmarkt 1, 9000 Gent"}
                            price={"€2,00/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"97% chance"}
                            />
                            <Card 
                            onClick={this.showMarkers}
                            destination={"sassevaartstraat 46, Gent"}
                            parkingName={"Parking Vrijdagmarkt (P1)"}
                            address={"Vrijdagmarkt 1, 9000 Gent"}
                            price={"€2,00/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"97% chance"}
                            />
                            <Card 
                            onClick={this.showMarkers}
                            destination={"sassevaartstraat 46, Gent"}
                            parkingName={"Parking Vrijdagmarkt (P1)"}
                            address={"Vrijdagmarkt 1, 9000 Gent"}
                            price={"€2,00/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"97% chance"}
                            />

                    </ScrollView>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding" enabled keyboardVerticalOffset={10}>
                    <Searchbar placeholder="Destination..." submitHandler={this.showPreferences}/>
                </KeyboardAvoidingView>
                <View style={styles.favorites} >
                    <Favorites height={500}/>
                    <Preferences ref="prefElement" height={700} searchHandler={this.showCards} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    favorites: {
        height: 20,
        width: '100%',
        position: "absolute",
        zIndex: 2,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        bottom: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        zIndex: 2,
    },
    cardContainer: {
        bottom: 140,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-end',
    },
});

export default HomeScreen