import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'

import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'
import Favorites from '../components/Favorites'
import Preferences from '../components/Preferences'



class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDisplay: "none",
            prefDisplay: "none",
            favsDisplay: "flex",
        }
    }

    showCards = () => {
        this.setState({cardDisplay: "flex"})
    }

    showPreferences = () => {
        this.refs.prefElement.showPrefPanel()
    }

    render() {
        return (
            <View style={styles.container}>
                <Map />
                <KeyboardAvoidingView style={styles.cardContainer} behavior="padding" enabled keyboardVerticalOffset={70}>
                    <ScrollView horizontal={true} style={{display: this.state.cardDisplay}}>
                        <Card
                            parkingName={"Parking Savaanstraat (P4)"}
                            address={"Savaanstraat 13, 9000 Gent"}
                            price={"€2,50/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"86% chance"}
                            />
                        <Card 
                            parkingName={"Interparking Gent Zuid"}
                            address={"Franklin Rooseveltlaan 3/A, 9000 Gent"}
                            price={"€3,00/started hour"}
                            type={"Underground"}
                            openWhen={"24/7"}
                            chance={"34% chance"}
                            />
                        <Card 
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