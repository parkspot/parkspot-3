import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SwipeUpContainer } from './Containers'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

class Preferences extends Component {
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

                <GestureRecognizer style={styles.swipeContainer} config={config} onSwipeUp={() => this.favsElement.current.ShowPanel()}>

                </GestureRecognizer>
                < SwipeUpContainer ref={this.favsElement} height={this.props.height} titleText={"Preferences"} >
                    <View style={styles.ruler}></View>
                        <View style={styles.listItemContainer}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Zone</Text>
                            </View>
                        </View>

                        <View style={styles.listItemContainer}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Price/hour</Text>
                            </View>
                        </View>

                        <View style={styles.listItemContainer}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Distance from destination</Text>
                            </View>
                        </View>

                        <View style={styles.listItemContainer}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Bancontact</Text>
                            </View>
                        </View>
                </SwipeUpContainer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        marginLeft: 20,
    },
    listItemContainer: {
        width:"100%",
        height:80,
        borderColor: 'rgba(112, 112, 112, 0.2)',
        borderTopWidth: 1,
    },
    listItemRowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    ruler: {
        borderColor: "#707070",
        borderBottomWidth: 0.9,
        opacity: 0.2,
    },
    swipeContainer: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 400,
        height: 70,

    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});


export default Preferences