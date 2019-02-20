import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { HeaderBackButton } from 'react-navigation';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Input,
  Icon,
  Footer,
  Row,
  Col,
  Spinner,
  View
} from 'native-base';

// Actions
import { getOrders, deleteOrder } from '../publics/redux/actions/orderActions';
// Utils
import { REST_API } from '../utils/constants';
// Helper
import { idrCurrency } from '../helper/helper';
// Data Services
import { updateTotalPrice } from '../services/fakeCartServices';
// Components
import ButtonComponent from '../components/Button';
import AlertComponent from '../components/Alert';

class CartList extends Component {
  state = {
    products: [],
    totalPrice: 0,
    spinner: true,
    showAlert: false
  };

  static navigationOptions = ({ navigation }) => {
    const cartLength = navigation.getParam('cartLength');
    return {
      title: 'Keranjang Belanja',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            navigation.navigate('ProductList', { cartLength });
          }}
        />
      ),
      headerTintColor: '#fff'
    };
  };

  async componentDidMount() {
    this.props.getOrders();
    // const products = await axios.get(`${REST_API}/orders/`);

    this.updateTotalPrice(this.props.orders);
    // this.setState({ products: products.data, spinner: false });
    // this.props.navigation.setParams({ cartLength: this.state.products.length });
  }

  handleDeleteConfimation = product => {
    Alert.alert(
      'Hapus Barang',
      `Apa kamu yakin ingin menghapus barang yang dipilih ?\n${
        product.products.name
      }`,
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Hapus',
          onPress: () => this.props.deleteOrder(product)
        }
      ],
      { cancelable: false }
    );
  };

  handlePressPay = () => {
    this.props.navigation.navigate('Payment');
  };

  handleIncrementQuantity = async product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);

    products[index].qty++;
    products[index].price =
      products[index].products.price * products[index].qty;

    this.setState({ products });
    this.updateTotalPrice(products);

    data = {
      qty: this.state.products[index].qty,
      price: this.state.products[index].price
    };

    await axios.patch(`${REST_API}/order/${product.id}`, data);
  };

  handleDecrementQuantity = async product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);

    products[index].qty--;
    if (products[index].qty <= 1) products[index].qty = 1;
    products[index].price =
      products[index].products.price * products[index].qty;

    this.setState({ products });
    this.updateTotalPrice(products);

    data = {
      qty: this.state.products[index].qty,
      price: this.state.products[index].price
    };

    await axios.patch(`${REST_API}/order/${product.id}`, data);
  };

  updateTotalPrice = products => {
    let totalPrice = products.reduce(function(prev, cur) {
      return Number(prev) + Number(cur.price);
    }, 0);

    this.setState({ totalPrice });
    // updateTotalPrice(totalPrice);
  };

  render() {
    const { products, totalPrice, spinner, showAlert } = this.state;
    const { orders, isLoading } = this.props;

    return (
      <Container>
        {isLoading ? (
          <Spinner color="#E40044" />
        ) : orders.length === 0 ? (
          <Content
            contentContainerStyle={{ marginTop: '20%', alignItems: 'center' }}
          >
            <Icon name="cart" />
            <Text>Belum ada barang di keranjang belanja kamu</Text>
          </Content>
        ) : (
          <>
            <Content contentContainerStyle={{ backgroundColor: '#F5F5F5' }}>
              {orders.map((product, index) => (
                <Card key={index} noShadow transparent>
                  <CardItem
                    header
                    style={{
                      backgroundColor: '#FAFAFA'
                    }}
                  >
                    <Text>
                      <Icon name="cart" />
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Card
                        transparent
                        style={{
                          flex: 4
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>
                          {product.products.name}
                        </Text>
                        <Text style={{ fontSize: 20, color: '#E40044' }}>
                          {idrCurrency(product.products.price)}
                        </Text>
                      </Card>
                      <Card
                        transparent
                        style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}
                      >
                        <Thumbnail
                          square
                          style={{ width: '100%', height: 70 }}
                          source={{ uri: product.products.image }}
                        />
                      </Card>
                    </Content>
                  </CardItem>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Content
                        contentContainerStyle={{
                          flexDirection: 'row'
                        }}
                      >
                        <ButtonComponent
                          iconName="remove"
                          onPress={() => this.handleDecrementQuantity(product)}
                        />
                        <Input
                          keyboardType="number-pad"
                          value={product.qty.toString()}
                          style={{
                            width: 5,
                            textAlign: 'center'
                          }}
                        />
                        <ButtonComponent
                          iconName="add"
                          onPress={() => this.handleIncrementQuantity(product)}
                        />
                      </Content>
                      <Card
                        transparent
                        style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}
                      >
                        <Icon
                          onPress={() => this.handleDeleteConfimation(product)}
                          style={{ color: '#E40044' }}
                          name="trash"
                        />
                      </Card>
                    </Content>
                  </CardItem>
                  <CardItem
                    footer
                    style={{
                      backgroundColor: '#FAFAFA',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Content>
                      <Text style={{ color: '#9A9A9A' }}>SUB TOTAL</Text>
                      <Text style={{ fontSize: 25, color: '#E40044' }}>
                        {idrCurrency(product.price)}
                      </Text>
                    </Content>
                  </CardItem>
                </Card>
              ))}
            </Content>
            <Footer style={{ backgroundColor: 'white', height: '10%' }}>
              <Row style={{ alignItems: 'center' }}>
                <Col style={{ padding: 10 }}>
                  <Text style={{ color: '#9A9A9A' }}>TOTAL BELANJA</Text>
                  <Text style={{ fontSize: 20, color: '#E40044' }}>
                    {idrCurrency(totalPrice)}
                  </Text>
                </Col>
                <Col style={{ padding: 10 }}>
                  <ButtonComponent
                    onPress={() => this.handlePressPay()}
                    block={true}
                    buttonName="Bayar"
                  />
                </Col>
              </Row>
            </Footer>
          </>
        )}
      </Container>
    );
  }
}

CartList.propTypes = {
  orders: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  message: state.order.message,
  isLoading: state.order.isLoading
});

export default connect(
  mapStateToProps,
  { getOrders, deleteOrder }
)(CartList);
