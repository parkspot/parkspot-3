//React imports
import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SwipeUpContainer } from './Containers'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

//Local imports
import FavoritesListItem from '../components/FavoritesListItem'

/**
 * @Class Favorites
 * Styling and functionality for favortites list
 */
class Favorites extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.favsElement = React.createRef();
    }

    /**
     * @function SwipedUp
     * Show the favorite list
     */
    SwipedUp = () => {
        this.favsElement.current.ShowPanel()
    }

    /**
     * @function render
     * @returns View of the favorite list
     */
    render() {
        //Config object to regulate the swipe up gesture
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (

            <View style={styles.container}>
                <GestureRecognizer style={styles.swipeContainer} config={config} onSwipeUp={() => this.SwipedUp()}></GestureRecognizer>
                < SwipeUpContainer ref={this.favsElement} height={this.props.height} titleText={"Favorites"} >
                    {/* list of text componenten */}
                    <FavoritesListItem/>
                    <FavoritesListItem/>
                    <FavoritesListItem/>
                    <FavoritesListItem/>
                    <View style={styles.ruler}></View>
                </SwipeUpContainer>
            </View>
        );
    }
}

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the Favorites List
 */
const styles = StyleSheet.create({
    swipeContainer: {
        position: "absolute",
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 400,
        height: 100,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ruler: {
        borderColor: "#707070",
        borderBottomWidth: 1,
        opacity: 0.2,
    }
});


export default Favorites