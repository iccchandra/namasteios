import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {White} from '../../themes/constantColors';
import moment from './../../utils/locale-moment'

class CallItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item, navigation} = this.props;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor}
            ]}>
                <View style={[styles.profileView]}>
                    <FastImage style={styles.profileImage} source={{uri: item.profilePic}}/>
                </View>
                <View style={[styles.infoView, {borderColor: theme.subSecondaryColor}]}>
                    <View style={styles.nameView}>
                        <Text style={[styles.nameText, {color: theme.primaryColor}]}>{item.name}</Text>
                        <Text style={[styles.messageText, {color: item.missCall ? theme.infoColor : theme.secondaryColor}]}>{item.message}</Text>
                    </View>
                    <View style={styles.timeView}>
                        <View style={[styles.onlineView, {backgroundColor: 'transparent'}]} />
                        <Text style={[styles.timeText, {color: theme.secondaryColor}]} >{moment.utc(item.createdDate).local().fromNow(true)}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default CallItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 58,
        height: 58,
        borderRadius: 29
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        height: 100,
        borderBottomWidth: 1
    },
    nameView: {
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '800',
    },
    messageText: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: '600',
    },
    timeView: {
        alignItems: 'flex-end',
        width: 80,
    },
    onlineView: {
        height: 12,
        width: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    timeText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '400',
    }
});
