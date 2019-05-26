import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'
import Favorites from '../components/Favorites'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.favsElement = React.createRef();
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };



        return (



            <View style={styles.container}>
                <Map />
                {/* <View style={styles.cardContainer}>
                    <ScrollView horizontal={true}>
                        <Card text={'Route 1'} />
                        <Card text={'Route 2'} />
                        <Card text={'Route 3'} />
                        <Card text={'Route 4'} />

                    </ScrollView>
                </View> */}

                <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding" enabled keyboardVerticalOffset={10}>
                    <Searchbar placeholder="Destination..." />

                </KeyboardAvoidingView>

                <View style={styles.favorites} >
                    <Favorites height={400} titleText='Favorites List' />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    favorites: {
        height: 20,
        width: '100%',

    },
    swipeContainer: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 400,
        height: 100,
        backgroundColor: 'transparent',
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
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    cardContainer: {
        maxHeight: '70%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
});

export default HomeScreen