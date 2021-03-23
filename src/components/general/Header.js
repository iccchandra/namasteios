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

class HeaderComponent extends React.PureComponent {
  render() {
    const {theme} = this.props;
    return (
      <View>
        <Header transparent>
          <Left>
            <Button style={{width: 40, marginLeft: 10}} transparent onPress={this.props.leftPress}>
              <Icon type={'Feather'} name="arrow-left" style={{color: theme.primaryColor}} />
            </Button>
          </Left>
          <Body>
            <Text style={[{textAlign: 'center'}]}>{this.props.title}</Text>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}

export default HeaderComponent;
