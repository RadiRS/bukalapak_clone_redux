import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Text,
  View,
  Container,
  Content,
  Thumbnail,
  Button,
  Icon
} from 'native-base';
import ButtonComponent from '../components/Button';
import InfoSlider from 'react-native-infoslider';

class Register extends Component {
  state = {
    position: 1,
    interval: null,
    dataSource: [
      {
        image: require('../../assets/img_slide_register/01.png')
      },
      {
        image: require('../../assets/img_slide_register/02.png')
      },
      {
        image: require('../../assets/img_slide_register/03.png')
      },
      {
        image: require('../../assets/img_slide_register/04.png')
      }
    ]
  };

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  static navigationOptions = () => {
    return {
      title: 'Keuntungan mendaftar',
      headerStyle: {
        backgroundColor: '#E40044',
        height: 70,
        elevation: 0
      },
      headerTitleStyle: {
        fontSize: 20
      },
      headerTitleContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      headerTintColor: '#fff'
    };
  };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={{ alignItems: 'center' }}>
          <View style={{ marginBottom: 30, height: 300 }}>
            <InfoSlider
              style={{ backgroundColor: 'blue' }}
              data={this.state.dataSource}
              showDots={true}
              activeDotColor="#E40044"
              loop={true}
              autoplay={true}
            />
          </View>
          <Button
            block
            style={{ height: 70, backgroundColor: '#E40044', marginBottom: 30 }}
          >
            <Text uppercase={false} style={{ fontSize: 20 }}>
              Daftar dengan E-mail atau No. Hp
            </Text>
          </Button>
          <Text style={{ fontSize: 20, marginBottom: 30 }}>
            Atau daftar dengan
          </Text>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30
            }}
          >
            <Button
              iconLeft
              style={{
                backgroundColor: '#FAFAFA',
                height: 70,
                flex: 1,
                marginRight: 20,
                justifyContent: 'center'
              }}
            >
              <Icon
                style={{ color: '#4A439B' }}
                name="facebook-f"
                type="FontAwesome"
              />
              <Text uppercase={false} style={{ fontSize: 20, color: '#233' }}>
                Facebook
              </Text>
            </Button>
            <Button
              iconLeft
              style={{
                backgroundColor: '#FAFAFA',
                height: 70,
                flex: 1,
                marginLeft: 20,
                justifyContent: 'center'
              }}
            >
              <Icon
                style={{ color: '#E83A2B' }}
                name="google"
                type="FontAwesome"
              />
              <Text uppercase={false} style={{ fontSize: 20, color: '#233' }}>
                Google
              </Text>
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ fontSize: 20 }}> Sudah punya akun login ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={{ color: '#E40044', fontSize: 20 }}>
                Login disini
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Register;
