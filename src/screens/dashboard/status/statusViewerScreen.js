import React, {useState} from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Platform,
    Alert,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';

import PROFILE from './../../../assets/profile2.jpg';
import BACK from './../../../assets/back.png';

const images = [
    'https://s3.ap-south-1.amazonaws.com/hsdreams1/pins/2019/01/big/7d1e5e0b31a650b9314023921b9e161b.jpeg',
    'https://boostupliving.com/wp-content/uploads/2019/06/best-motivational-quote-mobile-wallpapers-53.jpg',
    'https://i.pinimg.com/originals/51/bd/4c/51bd4c1e72d5d6ae5f2a4f31e31d2ef5.jpg',
    'https://pumpernickelpixie.com/wp-content/uploads/2016/01/15-phone-wallpaper.jpg',
    'https://i.pinimg.com/originals/5a/f0/e5/5af0e538f7437fd13a73f7c96601ccb6.jpg',
];

class statusViewerScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>

            </View>
        );
    }
}

export default statusViewerScreen;
