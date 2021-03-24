import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {White} from '../../themes/constantColors';
import {Icon} from "native-base";

class StatusContactItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item, type, navigation} = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => {}}>
                <View style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor}
                ]}>
                    <View style={[styles.profileView]}>
                        <FastImage style={styles.profileImage} source={{uri: item.thumbnailPath}}/>
                    </View>
                    <View style={[styles.infoView, {borderColor: theme.subSecondaryColor}]}>
                        <View style={styles.nameView}>
                            <Text style={[styles.nameText, {color: theme.primaryColor}]}>{item.givenName + ' ' + item.familyName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default StatusContactItem;

const CELL_WIDTH = 55;
const PHOTO_WIDTH = CELL_WIDTH - 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: CELL_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileView: {
        width: PHOTO_WIDTH,
        height: PHOTO_WIDTH,
        borderRadius: PHOTO_WIDTH/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: PHOTO_WIDTH,
        height: PHOTO_WIDTH,
        borderRadius: PHOTO_WIDTH/2,
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        height: CELL_WIDTH,
        borderBottomWidth: 1
    },
    nameView: {
        flex: 1,
    },
    nameText: {
        fontSize: 14,
        fontWeight: '800',
    },
});
