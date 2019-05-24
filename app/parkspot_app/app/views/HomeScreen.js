import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Searchbar from '../components/Searchbar'
import Card from '../components/Card'
import Map from '../components/Map'


class HomeScreen extends Component {
    render() {
        return (



            <View style={styles.container}>
                <Map />
                <View style={styles.buttonContainer}>
                    <Searchbar placeholder="Hello" />
                </View>

                <View style={styles.cardContainer}>
                    {/* horizontal scroll bar emotion card  */}
                    <ScrollView horizontal={true}>
                        <Card text={'Excellent'} />
                        <Card text={'Excellent'} />
                        <Card text={'Excellent'} />
                        <Card text={'Excellent'} />

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        alignItems: 'center',
    },
});

export default HomeScreen