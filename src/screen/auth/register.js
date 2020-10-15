import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

export default class Login extends Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      email: '',
      password: '',
      ulangiPassword: '',
      cekPassword: true,
      ulangiCekPassword: true,
    };
  }

  register = () => {
    const {name, email, password, ulangiPassword} = this.state;

    //POST json
    var dataToSend = {
      name: name,
      email: email,
      password: password,
      password_confirmation: ulangiPassword,
    };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent (key);
      var encodedValue = encodeURIComponent (dataToSend[key]);
      formBody.push (encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join ('&');
    //POST request
    fetch ('http://restful-api-laravel-7.herokuapp.com/api/register', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then (response => response.json ())
      //If response is in json then in success
      .then (responseJson => {
        console.log (responseJson);
        const {token} = responseJson;
        if (token) {
          alert ('register sukses');
          this.props.navigation.goBack ();
        }else{
          alert ('Pastikan Form Sudah Terisi dengan benar');
        }
      })
      //If response is not in json then in error
      .catch (error => {
        alert ('Pastikan Form Sudah Terisi dengan benar');
      });
  };

  render () {
    return (
      <View style={styles.container}>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 30,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          {' '}Register Akun Todo App
        </Text>
        <Image
          style={styles.bgImage}
          source={{uri: 'https://lorempixel.com/900/1400/nightlife/2/'}}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Nama"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState ({name})}
          />
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://w7.pngwing.com/pngs/930/532/png-transparent-computer-icons-personal-web-page-user-name-icon-monochrome-user-tag.png',
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState ({email})}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={this.state.cekPassword}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState ({password})}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Ulangi Password"
            secureTextEntry={this.state.ulangiCekPassword}
            underlineColorAndroid="transparent"
            onChangeText={ulangiPassword => this.setState ({ulangiPassword})}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>

        <TouchableOpacity
          style={styles.btnForgotPassword}
          onPress={() => this.props.navigation.goBack ()}
        >
          <Text style={styles.btnText}>Sudah memiliki akun?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.register ()}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
