import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SwipeUpContainer } from './Containers'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

class Favorites extends Component {
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
                < SwipeUpContainer ref={this.favsElement} height={this.props.height} titleText={this.props.titleText} >
                    {/* list of text componenten */}
                    <Text> Im the greatest</Text>
                </SwipeUpContainer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    swipeContainer: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 400,
        height: 70,
        backgroundColor: 'pink',

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


export default Favorites