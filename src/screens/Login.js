import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import {
  View,
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Footer,
  Button,
  Icon
} from 'native-base';
// Actions
import { loginUser } from '../publics/redux/actions/authActions';
// Component
import ButtonComponent from '../components/Button';
import { TextInput } from 'react-native-gesture-handler';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.navigation.navigate('Profile');
    }
  }

  componentDidMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        this.props.navigation.navigate('Profile');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  handleUserLogin = () => {
    const userdata = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userdata);
  };

  static navigationOptions = () => {
    return {
      title: 'BukaLapar',
      headerStyle: {
        backgroundColor: '#F8F8F8',
        height: 70,
        elevation: 0
      },
      headerTitleStyle: {
        color: '#E40044',
        fontSize: 30
      },
      headerTitleContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
      }
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 50,
              marginBottom: 30
            }}
          >
            Login
          </Text>

          <Button
            block
            iconLeft
            style={{ backgroundColor: '#4A439B', marginBottom: 20 }}
          >
            <Icon name="facebook-f" type="FontAwesome" />
            <Text uppercase={false} style={{ fontSize: 20 }}>
              Login dengan FB
            </Text>
          </Button>
          <Button
            block
            iconLeft
            style={{ backgroundColor: '#E83A2B', marginBottom: 30 }}
          >
            <Icon name="google" type="FontAwesome" />
            <Text uppercase={false} style={{ fontSize: 20 }}>
              Login dengan Google
            </Text>
          </Button>

          <Text style={{ alignSelf: 'center', fontSize: 20 }}>Atau</Text>

          <View style={{ marginBottom: 30 }}>
            <Item>
              <Input
                onChangeText={email => this.setState({ email })}
                placeholder="Email / Username"
              />
            </Item>
            <Item>
              <Input
                onChangeText={password => this.setState({ password })}
                textContentType="password"
                placeholder="Password"
              />
            </Item>
          </View>

          <Text style={{ fontSize: 20, color: '#939B9B' }}>
            Kamu belum punya akun ?
          </Text>
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text
              style={{ color: '#E40044', fontSize: 20, fontWeight: 'bold' }}
            >
              Silahkan daftar disini
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#939B9B' }}>
            Lupa password ?
          </Text>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{ color: '#E40044', fontSize: 20, fontWeight: 'bold' }}
            >
              Reset password disini
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#939B9B' }}>
            Belum menerima e-mail konfirmasi ?
          </Text>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{ color: '#E40044', fontSize: 20, fontWeight: 'bold' }}
            >
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
            <ButtonComponent
              onPress={() => this.handleUserLogin()}
              buttonName="Login"
              block={true}
            />
          </View>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
