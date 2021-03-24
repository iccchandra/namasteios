import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, FlatList, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right, Button, Item, Input} from 'native-base';
import {ONLINE, White} from '../../../themes/constantColors';
import SettingItem from '../../../components/general/SettingItem';
import FastImage from 'react-native-fast-image';
import moment from '../../../utils/locale-moment';

class sendingMoneySecreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: 'Elizabeth',
            bankName: 'ICICI Bank',
            money: '',
            note: '',
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
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Sending Money`}</Text>
                        </View>
                    </View>
                    <Right/>
                </View>
            </Header>
        )
    };

    render() {
        const {theme, navigation, route} = this.props;
        const {to, bankName, money, note} = this.state;

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            {this.renderNavHeader()}
            <View style={styles.innerView}>
                <View style={[styles.headerContainer, {borderColor: theme.subSecondaryColor}]}>
                     <Text style={[styles.nameText, {color: theme.secondaryColor}]}>To:</Text>
                    <Text style={[styles.nameText, {flex:1, color: theme.primaryColor}]}>  {to}</Text>
                </View>
                <View style={[styles.headerContainer, {borderColor: theme.subSecondaryColor}]}>
                    <Text style={[styles.nameText, {color: theme.secondaryColor}]}>Bank:</Text>
                    <Text style={[styles.nameText, {flex:1, color: theme.primaryColor}]}>  {bankName}</Text>
                    <Icon type={'Feather'} name="chevron-down" style={{color: theme.onlineColor, fontSize: 25}} />
                </View>
                <View style={{flex: 1, backgroundColor: theme.onlineColor}}>
                    <TextInput
                        style={{marginTop: 65, color: White, fontWeight: '600', fontSize: 28, textAlign: 'center'}}
                        value={money}
                        placeholder={'Enter Money'}
                        placeholderTextColor={White}
                        keyboardType={'number-pad'}
                        maxLength={15}
                        onChangeText={(money) => this.setState({money})}
                    />
                    <TextInput
                        style={{color: theme.subSecondaryColor, fontWeight: '600', fontSize: 14, textAlign: 'center'}}
                        value={note}
                        placeholder={`What's this for?`}
                        placeholderTextColor={theme.subSecondaryColor}
                        maxLength={30}
                        onChangeText={(note) => this.setState({note})}
                    />
                </View>
            </View>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(sendingMoneySecreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
    },
    headerContainer: {
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    nameView: {
        flex: 1,
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
