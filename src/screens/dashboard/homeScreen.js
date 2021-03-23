import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, findNodeHandle, NativeModules, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import HomeHeader from '../../components/general/HomeHeader';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import WhatsappTabBar from '../../components/general/WhatsappTabBar';
import StoryTab from './tabs/StoryTab';
import ChatsTab from './tabs/ChatsTab';
import CallsTab from './tabs/CallsTab';
import {getContacts} from '../../utils/contact';
import Feather from 'react-native-vector-icons/Feather';
import {Black, GRAY, LIGHTGRAY, ONLINE, White} from '../../themes/constantColors';
import {getStore} from '../../../App';
import {CONTACT} from '../../actions/types';
import {Popover} from 'react-native-modal-popover';
import { Button } from 'native-base';
import {OS, W_WIDTH} from '../../utils/regex';

class homeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           currentIndex: 1,
           showPopover: false,
           popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },
        }
    }

    componentDidMount() {
        getContacts().then(contacts => {
            getStore.dispatch({
                type: CONTACT,
                payload: contacts
            })
        }).catch(error => {

        })
    }

    setButton = (e, refButton) => {
        const handle = findNodeHandle(refButton);
        if (handle) {
            NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
                if (OS === 'ios')
                    this.setState({ popoverAnchor: { x, y: y - height, width, height } });
                else
                    this.setState({ popoverAnchor: { x, y: y - height - 30, width, height } });
            });
        }
    };

    openPopover = () => {
        this.setState({ showPopover: true })
    };

    closePopover = () => this.setState({ showPopover: false });

    searchPress = () => {

    };

    onBottomButtonPress = () => {
        const {navigation} = this.props;
        const {currentIndex} = this.state;
        if (currentIndex === 0) {

        } else if (currentIndex === 1) {
            navigation.navigate('SelectContact', {type: 'chat'})
        } else if (currentIndex === 2) {
            navigation.navigate('SelectContact', {type: 'call'})
        }
    };

    onChangeTab = (data) => {
        this.setState({currentIndex: data.i})
    };

    onPressOption = (type) => {
        const {navigation} = this.props;

        this.closePopover();
        if (type === 'group') {
            navigation.navigate('SelectContact', {type: 'chat'})
        } else if (type === 'broadcast') {
            navigation.navigate('NewBroadcast', {type: 'broadcast'})
        } else if (type === 'web') {

        } else if (type === 'starredMessages') {

        } else if (type === 'callLogs') {
            setTimeout(() => {
                Alert.alert(
                    "",
                    "Do you want to clear your entire call log?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                )
            }, 500);
        } else if (type === 'statusPrivacy') {
            navigation.navigate('StatusPrivacy')
        } else if (type === 'settings') {
            navigation.navigate('Setting')
        }
    };

    renderOption = () => {
        const {currentIndex} = this.state;

        return (<View style={{width: W_WIDTH/2}}>
            {
                currentIndex === 0
                    ? <Button transparent onPress={() => this.onPressOption('statusPrivacy')}>
                        <Text style={styles.popTitleText}>Status privacy</Text>
                    </Button>
                    : currentIndex === 1
                    ? <View>
                        <Button transparent onPress={() => this.onPressOption('group')}>
                            <Text style={styles.popTitleText}>New group</Text>
                        </Button>
                        <Button transparent onPress={() => this.onPressOption('broadcast')}>
                            <Text style={styles.popTitleText}>New broadcast</Text>
                        </Button>
                        <Button transparent onPress={() => this.onPressOption('web')}>
                            <Text style={styles.popTitleText}>Whatsapp Web</Text>
                        </Button>
                        <Button transparent onPress={() => this.onPressOption('starredMessages')}>
                            <Text style={styles.popTitleText}>Starred messages</Text>
                        </Button>
                    </View>
                    : <Button transparent onPress={() => this.onPressOption('callLogs')}>
                        <Text style={styles.popTitleText}>Clear call log</Text>
                    </Button>
            }
            <Button transparent onPress={() => this.onPressOption('settings')}>
                <Text style={styles.popTitleText}>Settings</Text>
            </Button>
        </View>)
    };

    render() {
        const {theme, navigation} = this.props;
        const {currentIndex, showPopover, popoverAnchor} = this.state;

        let name = 'message-square';
        if (currentIndex === 0)
            name = 'camera';
        else if (currentIndex === 2)
            name = 'phone-call';

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            <HomeHeader
                theme={theme}
                navigation={navigation}
                searchPress={this.searchPress}
                optionPress={this.openPopover}
                setButton={this.setButton}
            />
            <ScrollableTabView
                initialPage={1}
                onChangeTab={this.onChangeTab}
                renderTabBar={() => <WhatsappTabBar theme={theme} />}
            >
                <View tabLabel="Status" style={styles.tabView}>
                    <StoryTab theme={theme} navigation={navigation} />
                </View>
                <View tabLabel="Chats" style={styles.tabView}>
                    <ChatsTab theme={theme} navigation={navigation} />
                </View>
                <View tabLabel="Calls" style={styles.tabView}>
                    <CallsTab theme={theme} navigation={navigation} />
                </View>
            </ScrollableTabView>
            {
                currentIndex === 0 && <View style={styles.editButton}>
                    <Feather name={'edit-2'} size={25} color={Black} />
                </View>
            }
            <TouchableWithoutFeedback onPress={this.onBottomButtonPress}>
                <View style={styles.bottomButton}>
                    <Feather name={name} size={27} color={White} />
                </View>
            </TouchableWithoutFeedback>
            <Popover
                visible={showPopover}
                fromRect={popoverAnchor}
                onClose={this.closePopover}
                useNativeDriver={true}
                placement="bottom"
                backgroundStyle={{
                   backgroundColor: 'transparent'
                }}
                arrowStyle={{
                    borderTopColor: 'transparent'
                }}
            >
                {this.renderOption()}
            </Popover>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(homeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabView: {
        flex: 1,
    },
    editButton: {
        position: 'absolute',
        bottom: 105,
        right: 25,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHTGRAY
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
    popTitleText: {
        fontSize: 18,
        fontWeight: '400'
    }
});
