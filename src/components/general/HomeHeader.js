import React from 'react';
import {View, Text} from 'react-native';
import {
    Body,
    Button,
    Header,
    Icon,
    Left,
    Right,
} from 'native-base';

class HomeHeader extends React.PureComponent {

    render() {
        const {theme, optionPress, setButton} = this.props;
        return (
            <View>
                <Header transparent>
                    <Left>
                        <Text style={[{marginLeft: 5, fontSize: 22, width: 120, fontWeight: '800', color: theme.primaryColor}]}>Namaste</Text>
                    </Left>
                    <Right>
                        {/*<Button transparent onPress={searchPress}>*/}
                        {/*    <Icon type={'Feather'} name="search" style={{color: theme.primaryColor}} />*/}
                        {/*</Button>*/}
                        <Button ref={r => {this.button = r}}  transparent onPress={optionPress} onLayout={(e) => setButton(e, this.button)}>
                            <Icon type={'Feather'} name="more-vertical" style={{color: theme.primaryColor, fontSize: 25}} />
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}

export default HomeHeader;
