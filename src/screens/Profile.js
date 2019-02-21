import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, AsyncStorage } from 'react-native';
import { Button, Container, Content } from 'native-base';

// import {moduleName} from '../publics/redux/reducers/authReducers'

class Profile extends Component {
  _removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      this.props.navigation.navigate('Login');
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 20 }}>Selamat datang</Text>
          <Button block onPress={() => this._removeData()}>
            <Text> Logout </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user.user
});

export default connect(
  mapStateToProps,
  null
)(Profile);
