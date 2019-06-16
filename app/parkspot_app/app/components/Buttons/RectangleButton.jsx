//React imports
import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'

/**
 * @class RectangleButton
 * Styling for a custom rectangle button with a linear gradient
 */
class RectangleButton extends Component {
    /**
     * @constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props)
    }

    /**
     * @function render
     * @returns View of the Button
     */
    render() {
        return (
            <TouchableOpacity style={styles.rectangleButtonContainer} onPress={this.props.onPress}>
                <LinearGradient colors={this.props.color} style={styles.gradientContainer}>
                        <Text style={styles.text}> Search </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the RectangleButton
 */
const styles = StyleSheet.create({
    rectangleButtonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 200,
    },
    gradientContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 7,
    },
    text: {
        color: "#FFF",
        fontSize: 24,
    }
});
export default RectangleButton