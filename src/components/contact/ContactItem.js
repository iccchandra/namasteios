import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {White} from '../../themes/constantColors';
import {Icon} from "native-base";

class ContactItem extends Component {

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
                    {/* <View style={[styles.profileView]}>
                        <FastImage style={styles.profileImage} source={{uri: item.profilePic}}/>
                    </View> */}
                    <View style={[styles.infoView, {borderColor: theme.subSecondaryColor}]}>
                        <View style={styles.nameView}>
                            <Text style={[styles.nameText, {color: theme.primaryColor}]}>{item.givenName}</Text>
                            {/* {
                                type !== 'group_call' && <Text style={[styles.timeText, {color: theme.secondaryColor}]}>
                                    {item.status}
                                </Text>
                            } */}
                        </View>
                        {/* {
                            type === 'call' && <TouchableWithoutFeedback onPress={() => {}}>
                                <View style={{width: 40, paddingLeft: 10}}>
                                    <Icon type={'Feather'} name="phone-call" style={{color: theme.primaryColor, fontSize: 25}} />
                                </View>
                            </TouchableWithoutFeedback>
                        } */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default ContactItem;

const CELL_WIDTH = 75;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: CELL_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileView: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25
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
        height: CELL_WIDTH,
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
