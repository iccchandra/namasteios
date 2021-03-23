import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right, Button, Item, Input} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ONLINE, White} from '../../../themes/constantColors';
import SettingItem from '../../../components/general/SettingItem';
import FastImage from 'react-native-fast-image';
import moment from '../../../utils/locale-moment';

class settingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    title: 'Account',
                    icon: 'key',
                },
                {
                    id: 2,
                    title: 'Chat',
                    icon: 'message-square',
                },
                {
                    id: 3,
                    title: 'Notification',
                    icon: 'bell',
                },
                {
                    id: 4,
                    title: 'Data and storage usage',
                    icon: 'refresh-cw',
                },
                {
                    id: 5,
                    title: 'Contacts',
                    icon: 'user-plus',
                },
                {
                    id: 6,
                    title: 'Payment',
                    icon: 'credit-card',
                },
                {
                    id: 7,
                    title: 'Invite Friend',
                    icon: 'users',
                },
                {
                    id: 8,
                    title: 'About and Help',
                    icon: 'help-circle',
                }
            ],
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
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Settings`}</Text>
                        </View>
                    </View>
                    <Right/>
                </View>
            </Header>
        )
    };

    renderHeader = () => {
        const {theme, navigation} = this.props;
        return <View style={[
            styles.headerContainer,
            {backgroundColor: theme.container.backgroundColor, borderColor: theme.subSecondaryColor}
        ]}>
            <View style={[styles.profileView]}>
                <FastImage style={styles.profileImage} source={{uri: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}/>
            </View>
            <View style={[styles.infoView, {borderColor: theme.subSecondaryColor}]}>
                <View style={styles.nameView}>
                    <Text style={[styles.nameText, {color: theme.primaryColor}]}>{'Alice Barnett'}</Text>
                    <Text style={[styles.messageText, {color: theme.secondaryColor}]}>{'At Work'}</Text>
                </View>
            </View>
        </View>
    };

    render() {
        const {theme, navigation, route} = this.props;
        const {data} = this.state;

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            {this.renderNavHeader()}
            <View style={styles.innerView}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item }) =>
                        <SettingItem
                            type={'setting'}
                            item={item}
                            theme={theme}
                            navigation={navigation}
                        />
                    }
                    keyExtractor={item => item.id.toString()}
                    extraData={data}
                />
            </View>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(settingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 0
    },
    bottomButton: {
        position: 'absolute',
        bottom: 35,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ONLINE
    },
    headerContainer: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    profileView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        height: 100,
    },
    nameView: {
        flex: 1,
    },
    nameText: {
        fontSize: 20,
        fontWeight: '800',
    },
    messageText: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: '600',
    },
});
