import React, {
    Component
} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import {
    LinearGradient
} from 'expo'
import Map from '../components/Map'
import Searchbar from '../components/Searchbar'
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '100%',
        marginBottom: 40,
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        height: 'auto',
    },
    taskContainer: {
        maxWidth: '80%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

class HomeScreen extends Component {
    render() {
        return (

            <
            Map / >

        );
    }
}

export default HomeScreen