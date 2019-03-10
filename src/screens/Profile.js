import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import {
  Text,
  View,
  Badge,
  Container,
  Content,
  Thumbnail,
  Icon,
  Card,
  CardItem
} from 'native-base';

import { getUser } from '../publics/redux/actions/authActions';

class Profile extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#f8f8f8'
          }}
        >
          {/* Header */}
          <View
            style={{
              height: 220,
              flexBasis: null,
              backgroundColor: '#E40044',
              padding: 20
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Thumbnail
                style={{ marginRight: 10 }}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/dingyi/128.jpg'
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, color: '#fafafa' }}>
                  Selamat datang
                </Text>
                <Text
                  style={{ fontSize: 25, color: '#fafafa', fontWeight: 'bold' }}
                >
                  {this.props.user.username}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end'
                }}
              >
                <Icon
                  style={{ color: '#fafafa' }}
                  onPress={() =>
                    this.props.navigation.navigate('ProfileSetting')
                  }
                  name="cog"
                  type="FontAwesome"
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                margin: 5,
                flexDirection: 'row',
                borderColor: '#fafafa',
                borderRadius: 10,
                backgroundColor: '#fafafa'
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  marginHorizontal: 20
                }}
              >
                <Text style={{ color: '#E40044', fontSize: 25 }}>0</Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18
                  }}
                >
                  Wishlist Saya
                </Text>
              </View>
              <View
                style={{ alignItems: 'center', flex: 1, marginHorizontal: 20 }}
              >
                <Text style={{ color: '#E40044', fontSize: 25 }}>3</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                  Toko yang saya ikuti
                </Text>
              </View>
              <View
                style={{ alignItems: 'center', flex: 1, marginHorizontal: 20 }}
              >
                <Text style={{ color: '#E40044', fontSize: 25 }}>0</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                  Voucher
                </Text>
              </View>
            </View>
          </View>
          {/* Close Header */}

          {/* Menu Pesanan */}
          <Card noShadow transparent style={{ height: 200, marginBottom: 10 }}>
            <CardItem style={{ justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Pesanan Saya</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#E40044' }}>
                  Lihat Semua Pesanan >
                </Text>
              </TouchableOpacity>
            </CardItem>
            <CardItem
              style={{
                flex: 1,
                justifyContent: 'space-around',
                alignItems: 'flex-start'
              }}
            >
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  alignItems: 'center',
                  width: 100
                }}
              >
                <Icon
                  style={{ color: '#E40044', marginBottom: 5 }}
                  name="credit-card"
                  type="FontAwesome"
                />
                <Text style={{ textAlign: 'center' }}>Pilih Pembayaran</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  alignItems: 'center',
                  width: 70
                }}
              >
                <Icon
                  style={{ color: '#E40044', marginBottom: 5 }}
                  name="tasks"
                  type="FontAwesome"
                />
                <Text style={{ textAlign: 'center' }}>Dalam Proses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  alignItems: 'center',
                  width: 100
                }}
              >
                <Icon
                  style={{ color: '#E40044', marginBottom: 5 }}
                  name="truck"
                  type="FontAwesome"
                />
                <Text style={{ textAlign: 'center' }}>Dalam Pengiriman</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  alignItems: 'center',
                  width: 70
                }}
              >
                <Icon
                  style={{ color: '#E40044', marginBottom: 5 }}
                  name="comment"
                  type="FontAwesome"
                />
                <Badge
                  style={{
                    flex: 1,
                    alignSelf: 'flex-start',
                    backgroundColor: '#FDD938',
                    position: 'absolute',
                    left: 30,
                    bottom: 60,
                    flexBasis: 20
                    // height: 20
                  }}
                  warning
                >
                  <Text style={{ color: '#E40044' }}>12</Text>
                </Badge>
                <Text style={{ textAlign: 'center' }}>Untuk Diulas</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          {/* Close Menu Pesanan */}

          <Card noShadow transparent>
            <CardItem>
              <Text style={{ fontSize: 18 }}>Layanan</Text>
            </CardItem>
            <CardItem>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5
                  }}
                >
                  <Text>Ajak Teman</Text>
                  <Text>></Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5
                  }}
                >
                  <Text>Ulasan Saya</Text>
                  <Text>></Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, marginLeft: 40 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5
                  }}
                >
                  <Text>Pesan</Text>
                  <Text>></Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5
                  }}
                >
                  <Text>Metode Pembayaran</Text>
                  <Text>></Text>
                </TouchableOpacity>
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
