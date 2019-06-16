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
            userId: "",
            cardDisplay: "none",
            destinationAddress: "",
            destination: {},
            parkings: {}
        }
    }
    getResultsFromAPI = async(zone, price, distance, bancontact, lez, underground) => {
        const url = "http://192.168.5.136:8080/api/v1/searchparkingspots"

        var data = {
            "destinationGeo": {
                "long": this.state.destination.lng,
                "lat": this.state.destination.lat
                },
            "userId": this.state.userId,
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
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(async(response) => await this.setState({
            parkings: response
        }))
        .catch(error => console.error('Error:', error))
    }

    getDestCoordinates(destinationAddress){
        fetch("https://api.opencagedata.com/geocode/v1/json?q=" + destinationAddress + "&key=4fd9b61b904e466b8256aa5b4c04cb7b")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            destinationAddress: destinationAddress,
            destination: responseJson["results"][0]["geometry"]
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    showCards = async(zone, price, distance, bancontact, lez, underground) => {
        await this.getResultsFromAPI(zone, price, distance, bancontact, lez, underground)
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
            return this.setState({
                userId: value
            })
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

    componentWillMount() {
        this._retrieveDataFromAsyncStorage("userId")
    }

    render() {
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

                        {Array.from(this.state.parkings).map(parking => (
                            <Card
                            key={parking.address}
                            onClick={this.showMarkers}
                            destination={this.state.destinationAddress}
                            parkingName={parking.name}
                            address={parking.address.split(",", 1)}
                            price={parking.price.day}
                            type={parking.type}
                            openWhen={parking.open}
                            chance={parking.chance}
                            />
                        ))}

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