import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {White} from '../../themes/constantColors';
import moment from './../../utils/locale-moment'

class StoryItem extends Component {

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
                <TouchableWithoutFeedback onPress={() => {
                    // navigation.navigate('StatusViewer')
                }}>
                    <View style={[styles.profileView, {borderColor: theme.onlineColor}]}>
                        <FastImage style={styles.profileImage} source={{uri: item.profilePic}}/>
                        {
                            item.readStatus > 0 && <View style={[styles.unreadCountView, {backgroundColor: theme.onlineColor, borderColor: theme.container.backgroundColor}]}>
                                <Text style={styles.unreadCountText}>{item.readStatus}</Text>
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
                <View style={[styles.infoView, {borderColor: theme.subSecondaryColor}]}>
                    <View style={styles.nameView}>
                        <Text style={[styles.nameText, {color: theme.primaryColor}]}>{item.name}</Text>
                        <Text style={[styles.timeText, {color: theme.secondaryColor}]} >{moment.utc(item.messageDate).local().fromNow(true)}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default StoryItem;

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
        borderWidth: 3,
    },
    profileImage: {
        width: 58,
        height: 58,
        borderRadius: 29
    },
    unreadCountView: {
        position: 'absolute',
        bottom: 0,
        right: -4,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
    },
    unreadCountText: {
        fontSize: 12,
        fontWeight: '800',
        color: White
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
    timeText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '400',
    }
});
