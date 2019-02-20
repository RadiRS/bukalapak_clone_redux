import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import {
  getOrders,
  deleteOrder,
  incOrderQty,
  decOrderQty,
  updateOrderTotalPrice
} from '../publics/redux/actions/orderActions';
// Helper
import { idrCurrency } from '../helper/helper';
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

  componentDidUpdate(prevProps) {
    if (this.props.orders !== prevProps.orders) {
      this.props.updateOrderTotalPrice(this.props.orders);
    }
  }

  componentDidMount() {
    this.props.getOrders();
    this.props.updateOrderTotalPrice(this.props.orders);
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

  handleIncrementQuantity = product => {
    this.props.incOrderQty(product);
  };

  handleDecrementQuantity = product => {
    this.props.decOrderQty(product);
  };

  render() {
    const { products, totalPrice, spinner, showAlert } = this.state;
    const { orders, isLoading, totalPriceOrders } = this.props;

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
                    {idrCurrency(totalPriceOrders)}
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
  totalPriceOrders: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  incOrderQty: PropTypes.func.isRequired,
  decOrderQty: PropTypes.func.isRequired,
  updateOrderTotalPrice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  totalPriceOrders: state.order.totalPriceOrders,
  message: state.order.message,
  isLoading: state.order.isLoading
});

export default connect(
  mapStateToProps,
  { getOrders, deleteOrder, incOrderQty, decOrderQty, updateOrderTotalPrice }
)(CartList);
