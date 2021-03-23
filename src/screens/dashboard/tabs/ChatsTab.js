import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import chatListData from '../../../json/chatListData';
import { Item, Input, Icon } from 'native-base';
import ChatListItem from '../../../components/chat/ChatListItem';

class ChatsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data: JSON.parse(JSON.stringify(chatListData)),
           searchText: ''
        }
    }

    onChangeText = (text) => {
        let searchData = JSON.parse(JSON.stringify(chatListData));
        if (text.length !== 0) {
            const getData = searchData.filter(function (item) {
                return item.name.includes(text);
            });
            searchData = getData;
        }
        this.setState({searchText: text, data: searchData})
    };

    renderHeader = () => {
        const {theme, navigation} = this.props;
        const {searchText} = this.state;
        return <View>
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
        const {theme, navigation} = this.props;
        const {data} = this.state;

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            <View style={styles.innerView}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item }) =>
                        <ChatListItem
                           item={item}
                           theme={theme}
                           navigation={navigation}
                        />
                    }
                    keyExtractor={item => item.chatId.toString()}
                    extraData={data}
                />
            </View>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(ChatsTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 0
    }
});
