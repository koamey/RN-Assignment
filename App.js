import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Navigator from './routes/RouterModule';

export default class App extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}

