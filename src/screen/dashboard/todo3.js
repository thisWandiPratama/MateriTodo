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
  Modal,
} from 'react-native';

export default class Login extends Component {
  constructor (props) {
    super (props);
    this.state = {
      dataList: [],
      modal: false,
      task : '',
      desc : '',
      image : '',

    };
  }

  listTodo = () => {
    //GET request
    fetch ('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
      method: 'GET', //Request Type
      headers: {
        //Header Defination
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yZXN0ZnVsLWFwaS1sYXJhdmVsLTcuaGVyb2t1YXBwLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTYwMjgxMjAzMSwiZXhwIjoxNjAyODE1NjMxLCJuYmYiOjE2MDI4MTIwMzEsImp0aSI6Ik1ZMTh3SnlkY1Fjb2l2c0giLCJzdWIiOjMsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.6N2ejz58TfXxV0kkad80dQFpyMQK2GnapvXqrKljvXk',
        'Content-Type': 'application/json',
      },
    })
      .then (response => response.json ())
      //If response is in json then in success
      .then (responseJson => {
        const {status} = responseJson;
        if (status) {
          this.setState ({
            dataList: [],
          });
        } else {
          this.setState ({
            dataList: responseJson,
          });
        }
      })
      //If response is not in json then in error
      .catch (error => {
        console.log (error);
        //  alert('Email atau Password Salah')
      });
  };

  componentDidMount () {
    this.listTodo ();
  }

  modalAdd = () => {
    this.setState ({
      modal: !this.state.modal,
    });
  };

  sendTodo = () => {
    alert()
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.dataList.map ((value, index) => {
          return (
            <View
              key={index}
              style={{height: 80, backgroundColor: '#783854', margin: 10}}
            >
              <Text>{value.task}</Text>
              <Text>{value.desc}</Text>
              <Image
                source={{
                  uri: `http://restful-api-laravel-7.herokuapp.com/img/${value.image}`,
                }}
                style={{height: 50, width: 50}}
              />
              <Text>{value.is_done}</Text>
            </View>
          );
        })}
        <TouchableOpacity onPress={() => this.modalAdd ()} style={{margin: 20}}>
          <Text>Add</Text>
        </TouchableOpacity>

        <Modal animationType="slide" visible={this.state.modal}>
          <View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => this.modalAdd ()}
                style={{margin: 20}}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{margin: 20, marginTop: 25}}>
              <Text style={{textAlign: 'center'}}>Add Todo</Text>
              <View style={{alignItems: 'center', marginTop : 20, height : 120}}>
                <View style={{height : 120, width: 120,  backgroundColor : '#4555', justifyContent:'center'}}>
                  <Text style={{textAlign : 'center',}}>Select Foto</Text>
                </View>
              </View>
              <View style={{alignItems : 'center',}}>
                <TextInput
                  placeholder='Task'
                  style={{width: '80%', backgroundColor: '#456', marginTop: 10, borderRadius: 10}}
                  onChangeText={(task) => this.setState({task})}
                />
                <TextInput
                  placeholder='Desc'
                  style={{width: '80%', backgroundColor: '#456', marginTop: 10, borderRadius: 10}}
                  onChangeText={(desc) => this.setState({desc})}
                />
                <View style={{margin: 20}}>
               <Button title='Simpan' onPress={() => sendTodo()} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    width: 30,
    height: 30,
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
