import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon, Right} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ONLINE} from '../../../../themes/constantColors';
import SettingCommonView from '../../../../components/general/SettingCommonView';

class dataStorageSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLowDataUsage: false
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
                            <Text style={[{marginLeft: 5,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Data and storage usage`}</Text>
                        </View>
                    </View>
                    <Right/>
                </View>
            </Header>
        )
    };

    render() {
        const {theme, navigation, route} = this.props;
        const {isLowDataUsage} = this.state;

        return <View style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
        ]}>
            {this.renderNavHeader()}
            <ScrollView>
                <View style={styles.innerView}>
                    <Text style={styles.headlineText}>Usage</Text>
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Network usage'}
                        subtitle={'248.6 MB sent - 472.7 MB received'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Storage usage'}
                        subtitle={'1.5 GB'}
                        isBorder={true}
                        isRight={false}
                    />
                    <Text style={styles.headlineText}>Media auto-download</Text>
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'When using mobile data'}
                        subtitle={'Photos'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'When connected on Wi-Fi'}
                        subtitle={'All media'}
                        isRight={false}
                    />
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'When roaming'}
                        subtitle={'All media'}
                        isBorder={true}
                        isRight={false}
                    />
                    <Text style={styles.headlineText}>Call settings</Text>
                    <SettingCommonView
                        theme={theme}
                        navigation={navigation}
                        title={'Low data usage'}
                        subtitle={'Reduce the data used in a call'}
                        isRight={true}
                        value={isLowDataUsage}
                        toggleSwitch={(isLowDataUsage)=>this.setState({isLowDataUsage})}
                    />
                </View>
            </ScrollView>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(dataStorageSettingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headlineText: {
        paddingTop: 25,
        paddingBottom: 5,
        fontSize: 14,
        fontWeight: '500',
        color: ONLINE
    }
});
