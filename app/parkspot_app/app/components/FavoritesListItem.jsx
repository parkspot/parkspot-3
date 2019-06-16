//React imports
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

/**
 * @class FavoritesListItem
 * Styling of 1 favorites list item
 */
class FavoritesListItem extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
    }

    /**
     * @function render
     * @returns View of 1 list item
     */
    render() {
        return (
            <TouchableOpacity style={styles.listItemContainer}>
                <View style={styles.listItemRowContainer}>
                    <Ionicons name="ios-star" size={32} color="#707070" style={styles.favIcon}></Ionicons>
                    <Text>Onderbergen 42, Gent</Text>
                    <Ionicons name="ios-more" size={32} color="#707070" style={styles.moreIcon}></Ionicons>
                </View>
            </TouchableOpacity>
        )
    }
}

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the Favorites List item
 */
const styles = StyleSheet.create({
    listItemContainer: {
        width:"100%",
        height:"15%",
        borderColor: 'rgba(112, 112, 112, 0.2)',
        borderTopWidth: 1,
    },
    listItemRowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    favIcon: {
        marginLeft: 20,
        marginRight: 20,
    },
    moreIcon: {
        marginLeft: "auto",
        paddingRight: 20
    }

});


export default FavoritesListItem