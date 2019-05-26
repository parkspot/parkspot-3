import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native'
import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'
import PreferenceContainer from '../components/PreferenceContainer'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

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
                <View style={styles.cardContainer}>
                    <ScrollView horizontal={true}>
                        <Card text={'Route 1'} />
                        <Card text={'Route 2'} />
                        <Card text={'Route 3'} />
                        <Card text={'Route 4'} />

                    </ScrollView>
                </View>
                
                <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding" enabled keyboardVerticalOffset={10}>
                    <GestureRecognizer style={styles.swipeContainer} config={config} onSwipeUp={() => this.favsElement.current.ShowPanel()}>
                        <Searchbar placeholder="Destination..." />
                    </GestureRecognizer>
                </KeyboardAvoidingView>

                <PreferenceContainer ref={this.favsElement}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    swipeContainer: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        height: 100,
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
        marginBottom: 40,
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

export default HomeScreen