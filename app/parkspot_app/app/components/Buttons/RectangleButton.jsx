import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'

class RectangleButton extends Component {

    constructor(props) {
        super(props)
    }

    

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