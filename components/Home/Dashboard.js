import "react-native-gesture-handler";
import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default class Dashboard extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
        <Text>Welcome!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
