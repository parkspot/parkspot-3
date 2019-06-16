import React from 'react';
import { StyleSheet, View, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Config from 'react-native-config'

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = ''; // credit card nodig om route op kaart te tonen...

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapElement = React.createRef();
        this.state = {
            address: "vogelzangstraat 1, Lokeren",
            coordinates : {
                lat: 51.034809,
                lng: 3.729268
            },
            markers: []
        }
    }

    componentDidMount() {
        this.props.onRef(this)
      }

    getCoordinates(address){
        fetch("https://api.opencagedata.com/geocode/v1/json?q=" + address + "&key=4fd9b61b904e466b8256aa5b4c04cb7b")
        .then(response => response.json())
        .then((responseJson)=> {
          return responseJson["results"][0]["geometry"]
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    updateMarkers = (destinationAddress, parkingAddress) => {
        destCoord = getCoordinates(destinationAddress)
        parkingCoord =getCoordinates(parkingAddress)
        this.state.markers[0][lat] =  destCoord.lat
        this.state.markers[0][lng] =  destCoord.lng
        this.state.markers[1][lat] =  parkingCoord.lat
        this.state.markers[1][lng] =  parkingCoord.lng
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