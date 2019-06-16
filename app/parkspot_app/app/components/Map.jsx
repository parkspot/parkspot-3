import React from 'react';
import { StyleSheet, View, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = ''; // credit card nodig om route op kaart te tonen...

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destCoord: {},
            parkingCoord: {},
            markers: []
        }
    }

    getDestCoordinates(destinationAddress, parkingAddress){
        fetch("https://api.opencagedata.com/geocode/v1/json?q=" + destinationAddress + "&key=4fd9b61b904e466b8256aa5b4c04cb7b")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            destCoord: responseJson["results"][0]["geometry"]
          }, this.getParkingCoordinates(parkingAddress))
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    getParkingCoordinates(address){
        fetch("https://api.opencagedata.com/geocode/v1/json?q=" + address + "&key=4fd9b61b904e466b8256aa5b4c04cb7b")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            parkingCoord: responseJson["results"][0]["geometry"]
          }, this.setMarkers)
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    updateMarkers = async(destinationAddress, parkingAddress) => {
        await destinationAddress
        await this.getDestCoordinates(destinationAddress, parkingAddress)
    }

    setMarkers = () => {
        this.setState({
            markers: [
                {
                    key: 1,
                    lat: this.state.destCoord.lat,
                    lng: this.state.destCoord.lng
                },
                {
                    key: 2,
                    lat: this.state.parkingCoord.lat,
                    lng: this.state.parkingCoord.lng
                },
            ]
        })
    }

    render() {


        return (

            <MapView
                region={{
                    latitude: 51.034809,
                    longitude: 3.729268,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                style={styles.map}
                showsUserLocation={true}
            >
                {/*<MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                />*/}
                
                {this.state.markers.map(marker => (
                    <Marker
                    coordinate={{latitude: marker.lat, longitude: marker.lng}}
                    key={marker.key}
                    />
                ))}
            </MapView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonContainer: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default Map;