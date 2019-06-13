import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SwipeUpContainer } from './Containers'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import FavoritesListItem from '../components/FavoritesListItem'

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.favsElement = React.createRef();
    }

    SwipedUp = () => {
        this.favsElement.current.ShowPanel()
    }

    render() {
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