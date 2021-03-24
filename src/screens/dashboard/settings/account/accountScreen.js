import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ONLINE} from '../../../../themes/constantColors';
import SettingItem from '../../../../components/general/SettingItem';

class accountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    title: 'Privacy',
                    icon: 'lock',
                },
                {
                    id: 2,
                    title: 'Security',
                    icon: 'shield',
                },
                {
                    id: 3,
                    title: 'Two-step verification',
                    icon: 'more-horizontal',
                },
                {
                    id: 4,
                    title: 'Change number',
                    icon: 'phone-forwarded',
                },
                {
                    id: 5,
                    title: 'Request account info',
                    icon: 'file-text',
                },
                {
                    id: 6,
                    title: 'Delete my account',
                    icon: 'trash',
                },
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
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Account`}</Text>
                        </View>
                    </View>
                    <Right/>
                </View>
            </Header>
        )
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
                    renderItem={({ item }) =>
                        <SettingItem
                            type={'account'}
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

export default connect(mapStateToProps)(accountScreen);

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
