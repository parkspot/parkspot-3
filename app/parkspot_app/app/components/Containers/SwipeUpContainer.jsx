//React imports
import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'

//Local imports
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Title } from '../Texts/'

/**
 * @class SwipeUpContainer
 * Styling and functionality for a swipe up panel
 */
class SwipeUpContainer extends Component {

    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props)
    }

    /**
     * @function ClosePanel
     * Asynchronous function to hide the swipe up panel
     */
    ClosePanel = async () => {
        this._panel.hide()
    }

    /**
     * @function ShowPanel
     * Asynchronous function to show the swipe up panel
     */
    ShowPanel = async () => {
        this._panel.show()
    }

    /**
     * @function render
     * @returns View of the swipe up panel
     */
    render() {

        return (
            <View style={styles.container}>
                {/*<Button title='Show Settings' onPress={() => this._panel.show()} />*/}
                <SlidingUpPanel ref={c => this._panel = c} friction={0.80} minimumVelocityThreshold={0.1} snappingPoints={[0, 80]}>
                    <View style={[{ height: this.props.height }, styles.container_panel]}>
                        <View style={styles.container_preference}>
                            <View style={styles.dropDownElement}/>
                            <Title text={this.props.titleText} />
                            {/*<Button title='Hide' onPress={() => { this.ClosePanel() }} />*/}
                            {this.props.children}
                        </View>
                    </View>
                </SlidingUpPanel>
            </View >
        )
    }
}

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the swipe up panel
 */
const styles = StyleSheet.create({
    swipeContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: 'red',

    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '0%',
    },
    container_panel: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },


    container_preference: {
        borderRadius: 20,
        height: '100%',
        backgroundColor: 'white',
        width: '100%',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.09,
        shadowRadius: 4.65,
        elevation: 1,
    },
    dropDownElement: {
        width:"13%",
        height: 7,
        alignSelf: "center",
        marginTop: 7,
        borderRadius: 20,
        backgroundColor: '#000',
        opacity: 0.2
    }
});
export default SwipeUpContainer