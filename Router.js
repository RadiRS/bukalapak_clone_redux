import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

// Screens
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import CartList from './src/screens/CartList';
import Payment from './src/screens/Payment';
import PaymentDetail from './src/screens/PaymentDetail';
import Search from './src/screens/Search';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Profile from './src/screens/Profile';

// App Stack Navigator
const DashboardStackNavigator = createStackNavigator({
  ProductList,
  ProductDetail,
  CartList,
  Payment,
  Search,
  PaymentDetail,
  Login,
  Register
});

// App Drawer Navigator
const AppDrawerNavigator = createDrawerNavigator(
  {
    Beranda: {
      screen: DashboardStackNavigator
    },
    Profile
  },
  {
    useNativeAnimations: true,
    drawerType: 'slide',
    contentOptions: {
      activeTintColor: '#E40044',
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);

// App Container
const Router = createAppContainer(AppDrawerNavigator);

export default Router;
