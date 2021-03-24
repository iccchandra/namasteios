import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Switch, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from "native-base";
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {ASPECT_RATIO, W_HEIGHT} from '../../../utils/regex';
import {ONLINE, White} from '../../../themes/constantColors';

const IS_IPHONE_X = W_HEIGHT === 812 || W_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

class profileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaData: [

            ],
            backgroundImage: {uri: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}, // Put your own image here,
            isMuteNotification: false,
        }
    }

    componentDidMount(): void {

    }

    toggleSwitch = (isMuteNotification) => {
        this.setState({isMuteNotification})
    };

    renderNavBar = () => {
        const {navigation} = this.props;
        return (
            <View style={styles.navContainer}>
                <View style={styles.statusBar} />
                <View style={styles.navBar}>
                    <TouchableOpacity style={styles.iconLeft} onPress={() => navigation.pop()}>
                        <Icon type={'Feather'} name="arrow-left" style={{color: White, fontSize: 25}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
                        <Icon type={'Feather'} name="more-vertical" style={{color: White, fontSize: 25}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    renderContent = () => {
        const {theme} = this.props;
        const {mediaData, isMuteNotification} = this.state;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.subSecondaryColor},
            ]}>
               <View style={[styles.commonView, {backgroundColor: theme.container.backgroundColor}]}>
                   <View style={{flexDirection: 'row'}}>
                       <Text style={[styles.headerTitleText, {flex: 1}]}>Media</Text>
                       <Text style={styles.headerTitleText}>{`${mediaData.length}`}</Text>
                   </View>
               </View>
               <View style={[styles.commonView, {backgroundColor: theme.container.backgroundColor}]}>
                    <View style={[styles.itemContainer, {backgroundColor: theme.container.backgroundColor, borderColor: theme.subSecondaryColor}]}>
                        <View style={[styles.infoView]}>
                            <View style={styles.nameView}>
                                <Text style={[styles.nameText, {color: theme.primaryColor}]}>Mute notifications</Text>
                            </View>
                            <View style={styles.rightView}>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#767577' }}
                                    thumbColor={'#f4f3f4'}
                                    ios_backgroundColor={'#3e3e3e'}
                                    onValueChange={this.toggleSwitch}
                                    value={isMuteNotification}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.itemContainer, {backgroundColor: theme.container.backgroundColor, borderColor: 'transparent'}]}>
                       <View style={[styles.infoView]}>
                           <View style={styles.nameView}>
                               <Text style={[styles.nameText, {color: theme.primaryColor}]}>Media visibility</Text>
                           </View>
                       </View>
                   </View>
                </View>
               <View style={[styles.commonView, {backgroundColor: theme.container.backgroundColor}]}>
                    <Text style={[styles.headerTitleText, {flex: 1}]}>About and phone number</Text>
                    <View style={[styles.itemContainer, {backgroundColor: theme.container.backgroundColor, borderColor: theme.subSecondaryColor}]}>
                        <View style={[styles.infoView]}>
                            <View style={styles.nameView}>
                                <Text style={[styles.nameText, {color: theme.primaryColor}]}>Busy</Text>
                                <Text style={[styles.messageText, {color: theme.secondaryColor}]}>31 March 2018</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.itemContainer, {backgroundColor: theme.container.backgroundColor, borderColor: 'transparent', marginBottom: 0}]}>
                       <View style={[styles.infoView]}>
                           <View style={styles.nameView}>
                               <Text style={[styles.nameText, {color: theme.primaryColor}]}>+91 43522323535</Text>
                               <Text style={[styles.messageText, {color: theme.secondaryColor}]}>Mobile</Text>
                           </View>
                           <View style={styles.rightView}>
                               <TouchableWithoutFeedback onPress={() => {}}>
                                   <View style={{width: 40, paddingLeft: 10}}>
                                       <Icon type={'Feather'} name="message-square" style={{color: theme.primaryColor, fontSize: 25}} />
                                   </View>
                               </TouchableWithoutFeedback>
                               <TouchableWithoutFeedback onPress={() => {}}>
                                   <View style={{width: 40, paddingLeft: 10}}>
                                       <Icon type={'Feather'} name="phone-call" style={{color: theme.primaryColor, fontSize: 25}} />
                                   </View>
                               </TouchableWithoutFeedback>
                           </View>
                       </View>
                    </View>
               </View>
               <View style={[styles.commonView, {backgroundColor: theme.container.backgroundColor}]}>
                    <View style={[styles.itemContainer, {backgroundColor: theme.container.backgroundColor, borderColor: 'transparent', paddingTop: 8, paddingBottom: 8}]}>
                        <View style={[styles.infoView]}>
                            <View style={{width: 40, paddingRight: 10}}>
                                <Icon type={'Feather'} name="slash" style={{color: theme.infoColor, fontSize: 25}} />
                            </View>
                            <View style={[styles.nameView, {justifyContent: 'center'}]}>
                                <Text style={[styles.nameText, {color: theme.infoColor}]}>Block</Text>
                            </View>
                        </View>
                    </View>
                </View>
               <View style={[styles.commonView, {backgroundColor: theme.container.backgroundColor}]}>
                    <View style={[styles.itemContainer, {backgroundColor: theme.container.backgroundColor, borderColor: 'transparent', paddingTop: 8, paddingBottom: 8}]}>
                        <View style={[styles.infoView]}>
                            <View style={{width: 40, paddingRight: 10}}>
                                <Icon type={'Feather'} name="thumbs-down" style={{color: theme.infoColor, fontSize: 25}} />
                            </View>
                            <View style={[styles.nameView, {justifyContent: 'center'}]}>
                                <Text style={[styles.nameText, {color: theme.infoColor}]}>Report contact</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        const {theme} = this.props;
        const {backgroundImage} = this.state;

        return (
            <View style={[styles.container, {backgroundColor: theme.subSecondaryColor}]}>
                <ReactNativeParallaxHeader
                    headerMinHeight={HEADER_HEIGHT}
                    headerMaxHeight={ASPECT_RATIO(300)}
                    extraScrollHeight={20}
                    navbarColor={theme.onlineColor}
                    title="Elizabeth"
                    titleStyle={styles.titleStyle}
                    backgroundImage={backgroundImage}
                    backgroundImageScale={1.2}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    containerStyle={[styles.container, {backgroundColor: theme.subSecondaryColor}]}
                    contentContainerStyle={styles.contentContainer}
                    innerContainerStyle={[styles.container, {backgroundColor: theme.subSecondaryColor}]}
                    scrollViewProps={{
                        onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                        onScrollEndDrag: () => console.log('onScrollEndDrag'),
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(profileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: 'transparent',
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: White,
        fontWeight: 'bold',
        fontSize: 18,
    },
    commonView: {
        marginTop: 15,
        padding: 10
    },
    headerTitleText: {
        fontSize: 14,
        fontWeight: '500',
        color: ONLINE
    },
    itemContainer: {
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
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: 80,
    },
});
