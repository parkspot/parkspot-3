import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native'
import Searchbar from './Searchbar'
import Card from './Card'
import Map from './Map'
import Favorites from './Favorites'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Overlay } from 'react-native-elements';


class HomeOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,

        }
    }

    render() {

        return (

            <Overlay
                overlayStyle={styles.overlay}
                isVisible={this.state.isVisible}
                windowBackgroundColor="rgba(5, 5, 5, .5)"

                width="90%"
                height="40%"
                onBackdropPress={() => this.setState({ isVisible: false })}
            >
                <Image style={styles.image} source={require("../assets/images/overlay.jpg")} />
            </Overlay>

        );
    }
}


const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',

    }
    ,
    image: {
        width: '100%',
        height: '100%',

    }
})

export default HomeOverlay