import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/RouterModule';

export default class App extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}

