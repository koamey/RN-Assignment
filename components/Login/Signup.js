import 'react-native-gesture-handler';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contactNo: '',
      email: '',
      password: '',
    };
  }

  componentDidMount = () => {};

  setName = async (name) => {
    await this.setState({name: name});
  };

  setContactNo = async (contactNo) => {
    await this.setState({contactNo: contactNo});
  };

  setEmail = async (email) => {
    await this.setState({email: email});
  };

  setPassword = async (password) => {
    await this.setState({password: password});
  };

  onPressSignup = async () => {
    if (
      this.state.name == '' ||
      this.state.email == '' ||
      this.state.password == ''
    ) {
      console.log('enter all details');
    } else {
      const user = {
        id: 1,
        name: this.state.name,
        contactNo: this.state.contactNo,
        email: this.state.email,
        password: this.state.password,
      };
      const existingUsers = await AsyncStorage.getItem('users');
      let newUser = JSON.parse(existingUsers);
      if (!newUser) {
        newUser = [];
      }
      newUser.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(newUser))
        .then(async () => {
          console.log('saved successfully');
          this.setState({name: ''});
          this.setState({contactNo: ''});
          this.setState({email: ''});
          this.setState({password: ''});
          this.props.navigation.navigate('Login');
        })
        .catch(() => {
          console.log('failed');
        });
    }
  };

  signInNow = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/icon.png')} />
        <View style={globalStyles.inputView}>
          <TextInput
            style={globalStyles.TextInput}
            placeholder="Enter name"
            placeholderTextColor="#000000"
            onChangeText={(name) => this.setName(name)}
            value={this.state.name}
          />
        </View>
        <View style={globalStyles.inputView}>
          <TextInput
            style={globalStyles.TextInput}
            placeholder="Enter phone number"
            placeholderTextColor="#000000"
            onChangeText={(contactNo) => this.setContactNo(contactNo)}
            value={this.state.contactNo}
          />
        </View>
        <View style={globalStyles.inputView}>
          <TextInput
            style={globalStyles.TextInput}
            autoCapitalize="none"
            placeholder="Enter email"
            placeholderTextColor="#000000"
            onChangeText={(email) => this.setEmail(email)}
            value={this.state.email}
          />
        </View>
        <View style={globalStyles.inputView}>
          <TextInput
            style={globalStyles.TextInput}
            placeholder="Enter password"
            placeholderTextColor="#000000"
            secureTextEntry={true}
            onChangeText={(password) => this.setPassword(password)}
            value={this.state.password}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Button title="Sign up" onPress={this.onPressSignup} />
        </TouchableOpacity>
        <View style={styles.signInBtn}>
          <Text style={{fontSize: 16}}>Already have an account?</Text>
          <Button title="Sign in" onPress={this.signInNow} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#003f5c',
    alignItems: 'center',
  },
  loginBtn: {
    width: '90%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#f3f2f2',
  },
  signInBtn: {
    width: '90%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});
