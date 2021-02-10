import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount = () => {};

  setEmail = (email) => {
    this.setState({email: email});
  };

  setPassword = (password) => {
    this.setState({password: password});
  };

  onPressSignup = () => {
    this.setState({email: ''});
    this.setState({password: ''});
    this.props.navigation.navigate('Signup');
  };

  onPressLogin = async () => {
    console.log('email: ', this.state.email);
    console.log('password: ', this.state.password);
    const existingUsers = await AsyncStorage.getItem('users');
    let newUser = JSON.parse(existingUsers);
    console.log('1', newUser);
    if (newUser && newUser.length != 0) {
      for (var i = 0; i < newUser.length; i++) {
        if (
          (this.state.email == newUser[i]['email'] || this.state.email == newUser[i]['contactNo']) &&
          this.state.password == newUser[i]['password']
        ) {
          this.props.navigation.navigate('Dashboard');
          this.setState({email: ''});
          this.setState({password: ''});
          console.log('exists');
        } else {
          console.log('no');
        }
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/icon.png')} />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            autoCapitalize='none'
            onChangeText={(email) => this.setEmail(email)}
            placeholder="Enter Email or Contact number"
            placeholderTextColor="#000000"
            value={this.state.email}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={true}
            onChangeText={(password) => this.setPassword(password)}
            placeholder="Enter password"
            placeholderTextColor="#000000"
            value={this.state.password}
          />
        </View>

        <TouchableOpacity>
          <Button title="Sign up now!" onPress={this.onPressSignup} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Button title="LOGIN" onPress={this.onPressLogin} />
        </TouchableOpacity>
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

  inputView: {
    backgroundColor: '#f3f2f2',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#003f5c',
    alignItems: 'center',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#f3f2f2',
  },
});

export default Signin;
