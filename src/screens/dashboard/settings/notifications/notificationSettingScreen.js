import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ONLINE} from '../../../../themes/constantColors';
import SettingCommonView from '../../../../components/general/SettingCommonView';

class notificationSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConversationTones: true
        }
    }

    backPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    renderNavHeader = () => {
        const {theme, navigation} = this.props;

        return (
            <Header transparent>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={this.backPress}>
                            <View style={{width: 40, paddingLeft: 10}}>
                                <Icon type={'Feather'} name="arrow-left" style={{color: theme.primaryColor, fontSize: 25}} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Notifications`}</Text>
                        </View>
                    </View>
                    <Right/>
                </View>
            </Header>
        )
    };

    render() {
        const {theme, navigation, route} = this.props;
        const {isConversationTones} = this.state;

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            {this.renderNavHeader()}
            <ScrollView>
                <View style={styles.innerView}>
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Conversation tones'}
                        subtitle={'Play sounds for incoming and outgoing messages'}
                        isBorder={true}
                        isRight={true}
                        value={isConversationTones}
                        toggleSwitch={(isConversationTones)=>this.setState({isConversationTones})}
                    />
                    <Text style={styles.headlineText}>Messages</Text>
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Notification tone'}
                        subtitle={'Default'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Vibrate'}
                        subtitle={'Default'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Popup notification'}
                        subtitle={'No popup'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Light'}
                        subtitle={'White'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Use high priority notifications'}
                        subtitle={'Show previews of notifications at the top of the screen'}
                        isBorder={true}
                        isRight={true}
                        value={isConversationTones}
                        toggleSwitch={(isConversationTones)=>this.setState({isConversationTones})}
                    />
                    <Text style={styles.headlineText}>Groups</Text>
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Notification tone'}
                        subtitle={'Default'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Vibrate'}
                        subtitle={'Default'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Popup notification'}
                        subtitle={'No popup'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Light'}
                        subtitle={'White'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Use high priority notifications'}
                        subtitle={'Show previews of notifications at the top of the screen'}
                        isBorder={true}
                        isRight={true}
                        value={isConversationTones}
                        toggleSwitch={(isConversationTones)=>this.setState({isConversationTones})}
                    />
                    <Text style={styles.headlineText}>Calls</Text>
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Ringtone'}
                        subtitle={'Default'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Vibrate'}
                        subtitle={'Default'}
                        isRight={false}
                    />
                </View>
            </ScrollView>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(notificationSettingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headlineText: {
        paddingTop: 25,
        paddingBottom: 5,
        fontSize: 14,
        fontWeight: '500',
        color: ONLINE
    }
});
