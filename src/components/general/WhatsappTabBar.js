import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {ONLINE, White} from '../../themes/constantColors';

class WhatsappTabBar extends React.Component {
    icons = [];

    constructor(props) {
        super(props);
        this.icons = [];
    }

    render() {
        const {theme} = this.props;

        return <View style={[styles.tabs, this.props.style, ]}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                    <View style={styles.view}>
                         <Text style={this.props.activeTab === i
                             ? [styles.selectedText, {color: theme.primaryColor}]
                             : [styles.unSelectedText, {color: theme.secondaryColor}]}>{tab}</Text>
                         {this.props.activeTab === i && this.props.activeTab === 1  && <View style={styles.viewCount}>
                             <Text style={styles.countText}>25</Text>
                         </View>}
                    </View>
                </TouchableOpacity>;
            })}
        </View>;
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedText: {
        fontSize: 25,
        fontWeight: '800',
    },
    unSelectedText: {
        fontSize: 16,
        fontWeight: '800',
    },
    viewCount: {
        width: 28,
        height: 28,
        borderRadius: 24,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ONLINE
    },
    countText: {
        fontSize: 12,
        fontWeight: '800',
        color: White
    }
});

export default WhatsappTabBar;
