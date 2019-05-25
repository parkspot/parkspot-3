import React, { Component } from 'react'
import { View, StyleSheet, Button, ScrollView, Text, Animated } from 'react-native'
import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'
import SlidingUpPanel from 'rn-sliding-up-panel';

class PreferenceContainer extends Component {

    SaveSettingsAndClosePanel = async () => {
        this._panel.hide()
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='Show Settings' onPress={() => this._panel.show()} />
                <SlidingUpPanel ref={c => this._panel = c} friction={0.45}>
                    <View style={styles.container_panel}>
                        <Searchbar placeholder="hello" />
                        <View style={styles.container_preference}>
                            <Text>Here is the content inside panel</Text>
                            <Button title='Hide' onPress={() => { this.SaveSettingsAndClosePanel() }} />
                        </View>

                    </View>
                </SlidingUpPanel>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '5%',
    },
    container_panel: {
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '20%',

    },

    container_preference: {
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