import React, { Component } from 'react'
import { View, StyleSheet, Button, ScrollView, Text, Animated } from 'react-native'
import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'
import SlidingUpPanel from 'rn-sliding-up-panel';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class PreferenceContainer extends Component {

    SaveSettingsAndClosePanel = async () => {
        this._panel.hide()
    }

    ShowPanel = async () => {
        this._panel.show()
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        return (
            <View style={styles.container}>
                {/*<Button title='Show Settings' onPress={() => this._panel.show()} />*/}
                <SlidingUpPanel ref={c => this._panel = c} friction={1.5} minimumVelocityThreshold={0.5} snappingPoints={[0,80]}>
                    <View style={styles.container_panel}>
                        <GestureRecognizer style={styles.swipeContainer} config={config} onSwipeDown={() => this.SaveSettingsAndClosePanel()}>
                            <View style={styles.container_preference}>
                                <Text>Here is the content inside panel</Text>
                                <Button title='Hide' onPress={() => { this.SaveSettingsAndClosePanel() }} />
                            </View>
                        </GestureRecognizer>
                    </View>
                </SlidingUpPanel>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    swipeContainer: {
        width: "100%",
        height: "100%",
    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '0%',
    },
    container_panel: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '20%',

    },

    container_preference: {
        borderRadius: 20,
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,


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
export default PreferenceContainer