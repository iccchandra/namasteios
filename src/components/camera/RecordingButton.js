import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

export default class RecordingButton extends Component {

    constructor(props){
        super(props)
    }

    renderRecording() {
        return (
            <TouchableOpacity onPress={this.props.onStopPress}
                              style={[styles.buttonContainer, styles.buttonStopContainer, this.props.style]}>
                <View style={styles.buttonStop}></View>
            </TouchableOpacity>
        );
    }

    renderWaiting() {
        return (
            <TouchableOpacity onPress={this.props.onStartPress} style={[styles.buttonContainer, this.props.style]}>
                <View style={styles.circleInside}></View>
            </TouchableOpacity>
        );
    }

    render() {
        if (this.props.isRecording) {
            return this.renderRecording();
        }
        return this.renderWaiting();
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#D91E18',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'white',
    },
    circleInside: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#D91E18',
    },
    buttonStopContainer: {
        backgroundColor: 'transparent',
    },
    buttonStop: {
        backgroundColor: '#D91E18',
        width: 40,
        height: 40,
        borderRadius: 3,
    },
});
