import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DrawerActions } from 'react-navigation';
import { StatusBar, FlatList } from 'react-native';
import { Container, Spinner, Badge, Text, View, Toast } from 'native-base';
// Product Actions
import { getProducts } from '../publics/redux/actions/productActions';
import { getOrders, createOrder } from '../publics/redux/actions/orderActions';
// Utils
import { REST_API } from '../utils/constants';
// Components
import CartItem from '../components/CartItem';
import ButtonComponent from '../components/Button';

class ProductList extends Component {
  static navigationOptions = ({ navigation }) => {
    const ordersQuantity = navigation.getParam('ordersQuantity');
    return {
      title: 'Flash Sale',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerTintColor: '#fff',
      headerLeft: (
        <View style={{ alignItems: 'center' }}>
          <ButtonComponent
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            transparent={true}
            iconName="menu"
          />
        </View>
      ),
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <ButtonComponent
            onShow={true}
            onPress={() => navigation.navigate('Search')}
            transparent={true}
            iconName="search"
          />
          <ButtonComponent
            onShow={true}
            onPress={() => alert('log-in')}
            transparent={true}
            iconName="log-out"
          />
          <ButtonComponent
            onShow={true}
            onPress={() => navigation.navigate('CartList')}
            transparent={true}
            iconName="cart"
            mg={5}
          />
          {ordersQuantity > 0 ? (
            <Badge
              style={{
                flex: 1,
                alignSelf: 'flex-start',
                backgroundColor: '#FDD938',
                position: 'absolute',
                left: 126,
                bottom: 23
              }}
              warning
            >
              <Text style={{ color: '#E40044' }}>{ordersQuantity}</Text>
            </Badge>
          ) : null}
        </View>
      )
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.orders !== prevProps.orders) {
      this.props.navigation.setParams({
        ordersQuantity: this.props.orders.length
      });
    }
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getOrders();
    this.props.navigation.setParams({
      ordersQuantity: this.props.orders.length
    });
  }

  handleRefresh = () => {
    this.props.getProducts();
    this.props.getOrders();
  };

  handlePressBuyItem = product => {
    const data = {
      product_id: product.id,
      qty: 1,
      price: product.price
    };

    this.props.createOrder(data);

    // const result = await axios.post(`${REST_API}/order/`, data);

    if (this.props.message) {
      Toast.show({
        text: this.props.message,
        buttonText: 'Okay',
        duration: 2000,
        type: 'success'
      });
    }

    // const orders = await axios.get(`${REST_API}/orders/`);
    // const cart = [...orders.data];

    // this.props.navigation.setParams({ cartLength: cart.length });
    // this.setState({ cart });
  };

  handlePressProduct = id => {
    this.props.navigation.navigate('ProductDetail', {
      id,
      handlePressBuyItem: this.handlePressBuyItem
    });
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => (
    <CartItem
      onPressBuy={this.handlePressBuyItem}
      products={item}
      onPress={this.handlePressProduct}
    />
  );

  render() {
    const { products, isLoading } = this.props;
    return (
      <Container>
        <StatusBar backgroundColor="#E40044" />
        {isLoading ? (
          <Spinner color="#E40044" />
        ) : (
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            numColumns={2}
            refreshing={isLoading}
            onRefresh={() => this.handleRefresh()}
            renderItem={this.renderItem}
          />
        )}
      </Container>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products,
  orders: state.order.orders,
  message: state.order.message,
  isLoading: state.product.isLoading
});

export default connect(
  mapStateToProps,
  { getProducts, getOrders, createOrder }
)(ProductList);
