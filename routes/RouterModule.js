import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Products} from '../components/Home';
import {Signup, Signin} from '../components/Login';

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Signin,
    },
    Signup: Signup,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Products: Products,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
  },
);

const RouterModule = createStackNavigator({
  Login: LoginStack,
  Dashboard: HomeStack,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerShown: false,
  },
},
);

export default createAppContainer(RouterModule);
