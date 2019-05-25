import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import MapView from 'react-native-maps';




class Map extends React.Component {
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

            />

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