import React, { Component } from 'react';
import {
    Modal,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    InteractionManager,
    Dimensions,
    StyleSheet,
    Platform
} from 'react-native';
import moment from 'moment';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecordingButton from '../../../components/camera/RecordingButton';
const { width, height } = Dimensions.get('window');


class cameraScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            time: 0,
            recorded: false,
            recordedData: null
        };
    }

    componentDidMount() {
        const doPostMount = () => this.setState({ loading: false });
        if (this.props.runAfterInteractions) {
            InteractionManager.runAfterInteractions(doPostMount);
        } else {
            doPostMount();
        }
    }

    onSave = () => {
        if (this.callback) {
            this.callback(this.state.recordedData);
        }

        this.close();
    }

    open = (options, callback) => {
        this.callback = callback;
        this.setState({
            maxLength: -1,
            ...options,
            isRecording: false,
            time: 0,
            recorded: false,
            recordedData: null,
            converting: false,
        });
    };

    startCapture = () => {
        const shouldStartCapture = () => {
            this.camera.recordAsync(this.props.recordOptions)
                .then((data) => {
                    console.log('video capture', data);
                    this.setState({
                        recorded: true,
                        recordedData: data,
                    });
                }).catch(err => console.error(err));
            setTimeout(() => {
                this.startTimer();
                this.setState({
                    isRecording: true,
                    recorded: false,
                    recordedData: null,
                    time: 0,
                });
            });
        };
        if ((this.state.maxLength > 0) || (this.state.maxLength < 0)) {
            if (this.props.runAfterInteractions) {
                InteractionManager.runAfterInteractions(shouldStartCapture);
            } else {
                shouldStartCapture();
            }
        }
    }

    stopCapture = () => {
        const shouldStopCapture = () => {
            this.stopTimer();
            this.camera.stopRecording();
            this.setState({
                isRecording: false,
            });
        };
        if (this.props.runAfterInteractions) {
            InteractionManager.runAfterInteractions(shouldStopCapture);
        } else {
            shouldStopCapture();
        }
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            const time = this.state.time + 1;
            this.setState({ time });
            if (this.state.maxLength > 0 && time >= this.state.maxLength) {
                this.stopCapture();
            }
        }, 1000);
    }

    stopTimer = () => {
        if (this.timer) clearInterval(this.timer);
    }

    convertTimeString = (time) => {
        return moment().startOf('day').seconds(time).format('mm:ss');
    }

    renderTimer() {
        const { isRecording, time, recorded } = this.state;
        return (
            <View>
                {
                    (recorded || isRecording) &&
                    <Text style={this.props.durationTextStyle}>
                        <Text style={styles.dotText}>●</Text> {this.convertTimeString(time)}
                    </Text>
                }
            </View>
        );
    }

    renderContent() {
        const { isRecording, recorded } = this.state;
        return (
            <View style={styles.controlLayer}>
                {this.renderTimer()}
                <View style={[styles.controls]}>
                    <RecordingButton style={styles.recodingButton} isRecording={isRecording} onStartPress={this.startCapture}
                                     onStopPress={this.stopCapture} />
                    {
                        recorded &&
                        <TouchableOpacity onPress={this.onSave} style={styles.btnUse}>
                            {this.props.renderDone()}
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }

    renderCamera() {
        return (
            <RNCamera
                ref={(cam) => { this.camera = cam; }}
                style={styles.preview}
                captureAudio
            >
                {this.renderContent()}
            </RNCamera>
        );
    }

    render() {
        const { loading } = this.state;
        if (loading) return <View />;
        return (
            <View style={styles.modal}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        {this.renderCamera()}
                    </View>
                </View>
            </View>
        );
    }
}

export default cameraScreen

export const buttonClose = {
    position: 'absolute',
    right: 5,
    top: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
};

export const durationText = {
    marginTop: Platform.OS === 'ios' ? 20 : 20,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'center',
};

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        width,
        height,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonClose,
    preview: {
        width,
        height,
    },
    controlLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    controls: {
        position: 'absolute',
        bottom: 0,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    recodingButton: {
        marginBottom: Platform.OS === 'ios' ? 0 : 20,
    },
    durationText,
    dotText: {
        color: '#D91E18',
        fontSize: 10,
        lineHeight: 20,
    },
    btnUse: {
        position: 'absolute',
        width: 80,
        height: 80,
        right: 20,
        top: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    convertingText: {
        color: 'white',
        fontSize: 17,
        marginTop: 5,
        textAlign: 'center',
    },
});

export const renderClose = () => <Icon name="close" size={32} color="white" />;

export const renderDone = () => <View style={{
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03C9A9',
}}><Icon style={{
    backgroundColor: 'transparent',
}} name="done" size={24} color="white" /></View>;
