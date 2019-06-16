import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native'

import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'
import Favorites from '../components/Favorites'
import Preferences from '../components/Preferences'

const { width } = Dimensions.get('window');

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.mapElement = React.createRef();
        this.state = {
            cardDisplay: "none",
        }
    }

    showCards = () => {
        this.setState({cardDisplay: "flex"})
    }

    showPreferences = () => {
        this.refs.prefElement.showPrefPanel()
    }

    showMarkers = async(destinationAddress, parkingAddress) => {
        await this.mapElement.current
        this.mapElement.current.updateMarkers(destinationAddress, parkingAddress)
    }

    componentDidMount() {
		setTimeout(() => {this.scrollView.scrollTo({x: -10}) }, 1) // scroll view position fix
	}

    render() {
        return (
            <View style={styles.container}>
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