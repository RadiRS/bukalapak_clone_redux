import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Footer
} from 'native-base';
import ButtonComponent from '../components/Button';
import { TextInput } from 'react-native-gesture-handler';

class Login extends Component {
  static navigationOptions = () => {
    return {
      title: 'BukaLapar',
      headerStyle: {
        backgroundColor: '#F8F8F8'
      }
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Text style={{ fontWeight: 'bold' }}> Login </Text>
          <ButtonComponent
            buttonColor="#4A439B"
            block={true}
            buttonName="Login dengan FB"
          />
          <ButtonComponent
            buttonColor="#E83A2B"
            block={true}
            buttonName="Login dengan Google"
          />
          <Text style={{ alignSelf: 'center' }}>Atau</Text>
          {/* <Form> */}
          <Item>
            <Input placeholder="Email / Username" />
          </Item>
          <Item>
            <Input textContentType="password" placeholder="Password" />
          </Item>
          {/* </Form> */}
          <Text>Kamu belum punya akun ?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text style={{ color: '#E40044' }}>Silahkan daftar disini</Text>
          </TouchableOpacity>
          <Text>Lupa password ?</Text>
          <TouchableOpacity>
            <Text style={{ color: '#E40044' }}>Reset password disini</Text>
          </TouchableOpacity>
          <Text>Belum menerima e-mail konfirmasi ?</Text>
          <TouchableOpacity>
            <Text style={{ color: '#E40044' }}>
              Kirim ulang email konfirmasi
            </Text>
          </TouchableOpacity>
        </Content>
        <Footer
          style={{
            backgroundColor: 'white',
            padding: 10,
            paddingBottom: 10,
            height: 70
          }}
        >
          <View style={{ flex: 1 }}>
            <ButtonComponent buttonName="Login" block={true} />
          </View>
        </Footer>
      </Container>
    );
  }
}

export default Login;
