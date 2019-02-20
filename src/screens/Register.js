import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Container, Content, Thumbnail } from 'native-base';
import ButtonComponent from '../components/Button';

class Register extends Component {
  static navigationOptions = () => {
    return {
      title: 'Keuntungan mendaftar',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerTintColor: '#fff'
    };
  };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={{ alignItems: 'center' }}>
          <View>
            <Thumbnail
              square
              source={{ uri: 'http://lorempixel.com/640/480' }}
              style={{ height: 200, width: '100%' }}
            />
          </View>
          <ButtonComponent
            block={true}
            buttonName="Daftar dengan E-mail atau No. Hp"
          />
          <Text> Atau daftar dengan </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <ButtonComponent buttonColor="#FAFAFA" buttonName="Facebook" />
            <ButtonComponent buttonColor="#FAFAFA" buttonName="Google" />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text> Sudah punya akun login ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={{ color: '#E40044' }}> Login disini </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Register;
