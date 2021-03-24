import React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native'
import {Composer, GiftedChat} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import MessageInputToolBar from '../../../components/message/MessageInputToolBar';
import Feather from 'react-native-vector-icons/Feather';
import {Button, Header, Icon, Right} from 'native-base';
import {regex} from '../../../utils/regex';
import MessageItem from '../../../components/message/MessageItem';
import messages from '../../../json/messages';
import FastImage from 'react-native-fast-image';
import RNBottomActionSheet from 'react-native-bottom-action-sheet'

class messageScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            replyItem: null
        }
    }

    componentDidMount() {
        this.setState({
            messages: messages
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    userTyping(text)
    {
        this.setState({message: text});
    }

    backPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    profilePress = () => {
        const {navigation} = this.props;
        navigation.navigate('Profile');
    };

    _showGridView = () => {
        const {theme, navigation} = this.props;

        let docs = <Feather name={'file-text'} color={'#000000'} size={30} />;
        let pay = <Feather name={'credit-card'} color={'#000000'} size={30} />;
        let gallery = <Feather name={'image'} color={'#000000'} size={30} />;
        let audio = <Feather name={'mic'} color={'#000000'} size={30} />;
        let location = <Feather name={'map-pin'} color={'#000000'} size={30} />;
        let contact = <Feather name={'phone'} color={'#000000'} size={30} />;
        let SheetView = RNBottomActionSheet.SheetView;

        SheetView.Show({
            title: "Options",
            items: [
                { title: "Document", value: "docs", subTitle: "", icon: docs },
                { title: "Payment", value: "pay", subTitle: "", icon: pay },
                { title: "Gallery", value: "gallery", subTitle: "", icon: gallery },
                { title: "Audio", value: "audio", subTitle: "", icon: audio },
                { title: "Location", value: "location", subTitle: "", icon: location },
                { title: "Contact", value: "contact", subTitle: "", icon: contact },
            ],
            theme: theme.key === 'DARK' ? 'dark' : 'light',
            selection: 3,
            onSelection: (index, value) => {
                console.log("selection: " + index + " " + value);
                if (value === 'pay') {
                    navigation.navigate('SendingMoney')
                }
            },
            onCancel: () => console.log('Closing the bottom SheetView!!!')
        });
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
                        <TouchableWithoutFeedback onPress={this.profilePress}>
                            <FastImage style={{width: 34, height: 34, borderRadius: 17}} source={{uri: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.profilePress}>
                            <View>
                                <Text style={[{marginLeft: 10,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Elizabeth`}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Right>
                        <Button transparent onPress={this.searchPress}>
                            <Icon type={'Feather'} name="phone" style={{color: theme.primaryColor, fontSize: 25}} />
                        </Button>
                        <Button transparent onPress={this.optionPress}>
                            <Icon type={'Feather'} name="video" style={{color: theme.primaryColor, fontSize: 25}} />
                        </Button>
                    </Right>
                </View>
            </Header>
        )
    };

    renderToolbar = (props) => {
        const {theme} = this.props;

        let block_user = 0;
        let block_by = '';
        let name = 'Jonhy';

        if (block_user === 1 && block_by !== '') {
            return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 13, fontWeight: '600'}}>{`You blocked ${name}.`}</Text>
                    <Text style={{marginLeft: 5, fontSize: 13, fontWeight: '600', color: 'rgb(19,162,234)'}}>Delete chat.</Text>
                </View>
            )
        }

        return (<MessageInputToolBar theme={theme} {...props} replyItem={this.state.replyItem} />)
    };

    renderActions = (props) => {
        const {theme} = this.props;

        return (
            <View style={{height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={()=> {}}>
                    <View style={{
                        width: 40,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onTouchStart={(e) => {this.nativeEvent = e.nativeEvent}}>
                        <Feather name={'camera'} size={22} color={theme.primaryColor} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=> this._showGridView()}>
                    <View style={{
                        width: 40,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Feather name={'paperclip'} size={22} color={theme.primaryColor} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    };

    renderComposer = (props) => {
        return (<Composer {...props} textInputStyle={{justifyContent: 'center', paddingTop:8}}/>)
    };

    renderAccessory = (props) => {
        const {replyItem} = this.state;

        if (regex.isEmpty(replyItem))
            return null;

        let tag = 'yourself';
        let text = 'text';

        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
                    <Text style={{fontSize: 13, fontWeight: '500'}}>{`Replying to ${tag}`}</Text>
                    <Text style={{fontSize: 12, fontWeight: '400', color: 'gray', marginTop: 1}} numberOfLines={1}>{text}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={{width: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='close' style={{color: "#000", fontSize: 35}}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    };

    renderMessage(props) {
        const {theme} = this.props;
        return (<MessageItem theme={theme} {...props} />);
    }

    render() {
        const {theme} = this.props;
        const {messages, replyItem} = this.state;
        let minInputToolbarHeight = regex.isEmpty(replyItem) ? 30 : 50;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                {this.renderNavHeader()}
                <GiftedChat
                    ref={ref => this.chatRef = ref}
                    // Bottom toolbar
                    renderInputToolbar={this.renderToolbar}
                    renderActions={this.renderActions}
                    renderComposer={this.renderComposer}
                    renderAccessory={this.renderAccessory}
                    minInputToolbarHeight={minInputToolbarHeight}
                    // Message Component
                    renderMessage={this.renderMessage.bind(this)}

                    // Others
                    placeholder={'Type here...'}
                    onInputTextChanged={(text) => this.userTyping(text)}
                    onSend={messages => this.onSend(messages)}

                    messages={messages}
                    user={{_id: 1}}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(messageScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
