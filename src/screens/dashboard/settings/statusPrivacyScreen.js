import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right, ListItem, CheckBox, Body} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ONLINE} from '../../../themes/constantColors';

class statusPrivacyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1
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
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Status privacy`}</Text>
                        </View>
                    </View>
                    <Right/>
                </View>
            </Header>
        )
    };

    onPress = (callType) => {
        const {navigation, route} = this.props;

        navigation.navigate('StatusContactPrivacy', {callBack: (data) => {
               if (callType === 2) {
                   this.setState({selectedIndex:2})
               } else if (callType === 3) {
                   this.setState({selectedIndex:3})
               }
            }, type: callType
        })
    };

    render() {
        const {theme, navigation, route} = this.props;
        const {selectedIndex} = this.state;

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            {this.renderNavHeader()}
            <View style={styles.innerView}>
                <Text style={styles.titleText}>Who can see my status updates</Text>
                <TouchableWithoutFeedback onPress={()=>this.setState({selectedIndex:1})}>
                    <ListItem>
                        <CheckBox checked={selectedIndex === 1} color={theme.onlineColor} />
                        <Body>
                            <Text style={[styles.optionText, {color: theme.primaryColor}]}>My contacts</Text>
                        </Body>
                    </ListItem>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.onPress(2)}>
                    <ListItem>
                        <CheckBox checked={selectedIndex === 2} color={theme.onlineColor} />
                        <Body>
                            <Text style={[styles.optionText, {color: theme.primaryColor}]}>My contacts except...</Text>
                        </Body>
                    </ListItem>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.onPress(3)}>
                    <ListItem>
                        <CheckBox checked={selectedIndex === 3} color={theme.onlineColor} />
                        <Body>
                            <Text style={[styles.optionText, {color: theme.primaryColor}]}>Only share with...</Text>
                        </Body>
                    </ListItem>
                </TouchableWithoutFeedback>
                <Text style={[styles.infoText, {color: theme.secondaryColor}]}>Changes to your privacy settings won't effect status updates that you've sent already</Text>
            </View>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(statusPrivacyScreen);

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
    titleText: {
        fontSize: 14,
        fontWeight: '600',
        color: ONLINE,
        marginBottom: 10,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '400',
    },
    infoText: {
        marginTop: 25,
        fontSize: 14,
        fontWeight: '600',
    }
});
