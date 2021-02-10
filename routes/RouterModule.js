import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Dashboard from '../components/Home';
import {Signup, Signin} from '../components/Login';

const screens = {
    Signin: {
        screen: Signin
    },
    Dashboard: {
        screen: Dashboard
    },
    Signup: {
        screen: Signup
    }
}

const RouterModule = createStackNavigator(screens);

export default createAppContainer(RouterModule);