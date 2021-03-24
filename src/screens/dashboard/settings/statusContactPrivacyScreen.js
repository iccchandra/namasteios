import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right, Button, Item, Input} from 'native-base';
import {ONLINE, White} from '../../../themes/constantColors';
import Feather from 'react-native-vector-icons/Feather';
import StatusContactItem from '../../../components/contact/StatusContactItem';

let myContactData = [];

class statusContactPrivacyScreen extends Component {
    constructor(props) {
        super(props);
        let contacts = props.myContacts;
        const myContacts = contacts.map((item) => {
           item.selected = false;
           return item;
        });
        myContactData = myContacts;
        this.state = {
            data: myContacts,
            searchText: '',
            isSearch: false
        }
    }

    backPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    searchPress = () => {
        this.setState({isSearch: !this.state.isSearch})
    };

    renderNavHeader = () => {
        const {theme, navigation, route} = this.props;
        const {isSearch} = this.state;

        let title = 'Hide status with contacts';
        let subTitle = 'No contacts excluded';
        if (route.params.type === 3) {
            title = 'Share status with contacts';
            subTitle = 'No contacts selected';
        }

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
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]} numberOfLines={1}>{title}</Text>
                            <Text style={[{marginLeft: 5,fontSize: 12, fontWeight: '500', color: theme.secondaryColor}]} numberOfLines={1}>{subTitle}</Text>
                        </View>
                    </View>
                    <Right>
                        <Button transparent onPress={this.searchPress}>
                            <Icon type={'Feather'} name="search" style={{color: isSearch ? theme.onlineColor : theme.primaryColor, fontSize: 25}} />
                        </Button>
                    </Right>
                </View>
            </Header>
        )
    };

    onChangeText = (text) => {
        let searchData = JSON.parse(JSON.stringify(myContactData));
        if (text.length !== 0) {
            const getData = searchData.filter(function (item) {
                return item.givenName.includes(text);
            });
            searchData = getData;
        }
        this.setState({searchText: text, data: searchData})
    };

    renderHeader = () => {
        const {theme, navigation} = this.props;
        const {searchText, isSearch} = this.state;

        if (!isSearch)
            return <View />;

        return <View style={{marginBottom: 10}}>
            <Item style={{backgroundColor: theme.subPrimaryColor, paddingLeft: 20, borderRadius: 25, borderBottomWidth: 0, height: 40}}>
                <Icon name="ios-search" style={{fontSize: 20, marginTop: 4, color: theme.primaryColor}} />
                <Input placeholder="Search"
                       style={{fontSize: 14, color: theme.primaryColor}}
                       placeholderTextColor={theme.primaryColor}
                       value={searchText}
                       onChangeText={this.onChangeText}
                />
            </Item>
        </View>
    };

    render() {
        const {theme, navigation, route} = this.props;
        const type = route.params.type;
        const {data} = this.state;
        console.log(data);

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
                        <StatusContactItem
                            type={type}
                            item={item}
                            theme={theme}
                            navigation={navigation}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    extraData={data}
                />
            </View>
            <TouchableWithoutFeedback onPress={this.onBottomButtonPress}>
                <View style={styles.bottomButton}>
                    <Feather name={'arrow-right'} size={27} color={White} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    myContacts: state.auth.contactData,
});

export default connect(mapStateToProps)(statusContactPrivacyScreen);

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
