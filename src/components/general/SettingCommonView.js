import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, Switch} from 'react-native';
import {White} from '../../themes/constantColors';

class SettingCommonView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, title, subtitle, isBorder, isRight, value, toggleSwitch, navigation} = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => {}}>
                <View style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor, borderColor: isBorder ? theme.subSecondaryColor : 'transparent'}
                ]}>
                    <View style={[styles.infoView]}>
                        <View style={styles.nameView}>
                            <Text style={[styles.nameText, {color: theme.primaryColor}]}>{title}</Text>
                            <Text style={[styles.messageText, {color: theme.secondaryColor}]}>{subtitle}</Text>
                        </View>
                        {
                            isRight && <View style={styles.rightView}>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#767577' }}
                                    thumbColor={'#f4f3f4'}
                                    ios_backgroundColor={'#3e3e3e'}
                                    onValueChange={toggleSwitch}
                                    value={value}
                                />
                            </View>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default SettingCommonView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
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
        fontSize: 14,
        fontWeight: '500',
    },
    rightView: {
        alignItems: 'flex-end',
        width: 80,
    },
});
