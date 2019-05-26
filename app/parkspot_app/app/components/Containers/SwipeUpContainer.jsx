import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel';
import { Title } from '../Texts/'
class SwipeUpContainer extends Component {

    constructor(props) {
        super(props)
    }


    ClosePanel = async () => {
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
                <SlidingUpPanel ref={c => this._panel = c} friction={1.50} minimumVelocityThreshold={0.1} snappingPoints={[0, 80]}>
                    <View style={[{ height: this.props.height }, styles.container_panel]}>
                        <View style={styles.container_preference}>
                            {this.props.children}
                            <Title text={this.props.titleText} />
                            <Button title='Hide' onPress={() => { this.ClosePanel() }} />
                        </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },


    container_preference: {
        borderRadius: 20,
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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
export default SwipeUpContainer