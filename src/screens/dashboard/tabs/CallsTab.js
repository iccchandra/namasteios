import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { Item, Input, Icon } from 'native-base';
import CallItem from '../../../components/call/CallItem';
import callData from '../../../json/callData';

class CallsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: callData
        }
    }

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
                    renderItem={({ item }) =>
                        <CallItem
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

export default connect(mapStateToProps)(CallsTab);

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
