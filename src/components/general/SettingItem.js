import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, Share} from 'react-native';
import {Icon} from "native-base";
import {THEMES} from '../../themes/themes';
import {regex} from '../../utils/regex';
import {getStore} from '../../../App';
import {THEME} from '../../actions/types';

class SettingItem extends Component {

    constructor(props) {
        super(props);
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    settingPress = () => {
        const {item, navigation} = this.props;
        if (item.id === 1) {
            navigation.navigate('Account');
        } else if (item.id === 2) {
            navigation.navigate('ChatSetting');
        } else if (item.id === 3) {
            navigation.navigate('NotificationSetting');
        } else if (item.id === 4) {
            navigation.navigate('DataStorageSetting');
        } else if (item.id === 7) {
            this.onShare();
        } else if (item.id === 8) {
            navigation.navigate('HelpSetting');
        }
    };

    toggleSwitch = () => {
        const {theme} = this.props;
        let newTheme;
        if (theme.key === 'DARK') {
            newTheme = THEMES[1];
            regex.changeStatusStyle('dark-content');
        } else {
            newTheme = THEMES[0];
            regex.changeStatusStyle('light-content');
        }
        getStore.dispatch({type: THEME, payload: newTheme});
    };

    onChatPress = () => {
        const {item, navigation} = this.props;
        if (item.id === 1) {
            this.toggleSwitch();
        }
    };

    onPress = () => {
        const {type} = this.props;
        if (type === 'setting')
            this.settingPress();
        else if (type === 'chat')
            this.onChatPress();
    };

    render() {
        const {theme, item, navigation} = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor}
                ]}>
                    <View style={[styles.profileView]}>
                        <Icon type={'Feather'} name={item.icon} style={{color: theme.primaryColor, fontSize: 25}} />
                    </View>
                    <View style={[styles.infoView, {borderColor: theme.subSecondaryColor}]}>
                        <View style={styles.nameView}>
                            <Text style={[styles.nameText, {color: theme.primaryColor}]}>{item.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default SettingItem;

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
