import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Text, SectionList} from 'react-native';
import {connect} from 'react-redux';
import { Item, Input, Icon } from 'native-base';
import storyData from '../../../json/storyData';
import StoryItem from '../../../components/story/StoryItem';
import FastImage from 'react-native-fast-image';
import {White} from '../../../themes/constantColors';

class StoryTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: 'Recent updates',
                    data: JSON.parse(JSON.stringify(storyData)),
                },
                {
                    title: 'Viewed updates',
                    data: []
                }
            ],
            searchText: ''
        }
    }

    onChangeText = (text) => {
        let searchData = JSON.parse(JSON.stringify(storyData));
        if (text.length !== 0) {
            const getData = searchData.filter(function (item) {
                return item.name.includes(text);
            });
            searchData = getData;
        }
        let newData = this.state.data;
        newData[0].data = searchData;
        this.setState({searchText: text, data: newData})
    };

    renderHeader = () => {
        const {theme, navigation} = this.props;
        const {searchText} = this.state;
        return <View>
            <Item style={{
                backgroundColor: theme.subPrimaryColor,
                paddingLeft: 20,
                borderRadius: 25,
                borderBottomWidth: 0,
                height: 40
            }}>
                <Icon name="ios-search" style={{fontSize: 20, marginTop: 4, color: theme.primaryColor}} />
                <Input placeholder="Search"
                       style={{fontSize: 14, color: theme.primaryColor}}
                       placeholderTextColor={theme.primaryColor}
                       value={searchText}
                       onChangeText={this.onChangeText}
                />
            </Item>
            <View style={{
                height: 120,
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingBottom: 15,
            }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Camera')}>
                    <View style={[styles.profileView, {borderColor: theme.onlineColor}]}>
                        <FastImage style={styles.profileImage} source={{uri: 'https://images.unsplash.com/photo-1498661367879-c2085689eed4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}/>
                        <View style={[styles.addView, {backgroundColor: theme.onlineColor, borderColor: theme.container.backgroundColor}]}>
                            <Text style={styles.addText}>{'+'}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.nameView}>
                    <Text style={[styles.nameText, {color: theme.primaryColor}]}>{'My Story'}</Text>
                    <Text style={[styles.timeText, {color: theme.secondaryColor}]} >{'Add to my status'}</Text>
                </View>
            </View>
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
                <SectionList
                    sections={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item }) =>
                        <StoryItem
                            item={item}
                            theme={theme}
                            navigation={navigation}
                        />
                    }
                    renderSectionHeader={({ section: { title, data } }) => {
                        if (data.length === 0)
                            return;

                        return <View style={{height: 30, justifyContent: 'center', backgroundColor: theme.container.backgroundColor}}>
                            <Text style={{fontSize: 14, fontWeight: '500', color: theme.secondaryColor}}>{title}</Text>
                        </View>
                    }}
                />
            </View>
        </View>
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(StoryTab);

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
    profileView: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
    },
    profileImage: {
        width: 68,
        height: 68,
        borderRadius: 34
    },
    addView: {
        position: 'absolute',
        bottom: 0,
        right: -4,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
    },
    addText: {
        fontSize: 14,
        fontWeight: '800',
        color: White
    },
    nameView: {
        flex: 1,
        marginLeft: 15,
        paddingBottom: 10,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '800',
    },
    timeText: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '400',
    }
});
