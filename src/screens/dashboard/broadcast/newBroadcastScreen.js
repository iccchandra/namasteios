import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right, Button} from 'native-base';
import contactData from '../../../json/contactData';
import ContactItem from '../../../components/contact/ContactItem';
import Feather from 'react-native-vector-icons/Feather';
import {ONLINE, White} from '../../../themes/constantColors';

class newBroadcastScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: contactData,
            selectedData: []
        }
    }

    backPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    onBottomButtonPress = () => {
        const {navigation, route} = this.props;
        const type = route.params.type;

        navigation.goBack();
        if (type === 'call') {
            navigation.navigate('NewGroup', {type: 'group_call'})
        } else if (type === 'chat') {
            navigation.navigate('NewGroup', {type: 'group_chat'})
        }
    };

    searchPress = () => {

    };

    optionPress = () => {

    };

    renderHeader = () => {
        const {theme, navigation} = this.props;
        const {data, selectedData} = this.state;

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
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`New broadcast`}</Text>
                            <Text style={[{marginLeft: 5,fontSize: 12, fontWeight: '500', color: theme.secondaryColor}]}>{`${selectedData.length} of ${data.length} selected`}</Text>
                        </View>
                    </View>
                    <Right>
                        <Button transparent onPress={this.searchPress}>
                            <Icon type={'Feather'} name={'search'} style={{color: theme.primaryColor, fontSize: 25}} />
                        </Button>
                    </Right>
                </View>
            </Header>
        )
    };

    render() {
        const {theme, navigation, route} = this.props;
        const type = route.params.type;
        const {data} = this.state;

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            {this.renderHeader()}
            <View style={styles.innerView}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <ContactItem
                            type={type}
                            item={item}
                            theme={theme}
                            navigation={navigation}
                        />
                    }
                    keyExtractor={item => item.userId.toString()}
                    extraData={data}
                />
            </View>
            <TouchableWithoutFeedback onPress={this.onBottomButtonPress}>
                <View style={styles.bottomButton}>
                    <Feather name={'check'} size={27} color={White} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(newBroadcastScreen);

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
    }
});
