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
  ToastAndroid,
  ScrollView,
} from 'react-native';
import axios from 'axios';

// 1 import
import ImagePicker from 'react-native-image-picker';

// 2 buat variabel options
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Login extends Component {
  constructor (props) {
    super (props);
    this.state = {
      id : '',
      dataList: [],
      // add data
      modal: false,
      modaledit: false,
      avatarSource: {
        uri: 'https://static.thenounproject.com/png/1560819-200.png',
      },
      fileName: '',
      fileSize: '',
      type: '',
      uri: '',
      task: '',
      desc: '',
      is_done: 0,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yZXN0ZnVsLWFwaS1sYXJhdmVsLTcuaGVyb2t1YXBwLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTYwMjkyMzI0NiwiZXhwIjoxNjAyOTI2ODQ2LCJuYmYiOjE2MDI5MjMyNDYsImp0aSI6Im9ra3F3TDh5N3EySEtYSloiLCJzdWIiOjMsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.fH_e8ayGaSTE5Atbi4B40FgRxX710GL9Bk__2VQzj0I',
    };
  }

  listTodo = () => {
    //GET request
    fetch ('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
      method: 'GET', //Request Type
      headers: {
        //Header Defination
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yZXN0ZnVsLWFwaS1sYXJhdmVsLTcuaGVyb2t1YXBwLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTYwMjkyMzI0NiwiZXhwIjoxNjAyOTI2ODQ2LCJuYmYiOjE2MDI5MjMyNDYsImp0aSI6Im9ra3F3TDh5N3EySEtYSloiLCJzdWIiOjMsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.fH_e8ayGaSTE5Atbi4B40FgRxX710GL9Bk__2VQzj0I',
        'Content-Type': 'application/json',
      },
    })
      .then (response => response.json ())
      //If response is in json then in success
      .then (responseJson => {
        console.log (responseJson);
        const {status} = responseJson;
        if (status) {
          console.log (responseJson);
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

  modalEdit = dataEdit => {
    console.log (dataEdit);
    const avatarSource = {
      uri: `http://restful-api-laravel-7.herokuapp.com/img/${dataEdit.image}`,
    };
    this.setState ({
      task: dataEdit.task,
      desc: dataEdit.desc,
      avatarSource: avatarSource,
      uri: dataEdit.image,
      is_done: dataEdit.is_done==false ?  0 : 1,
      id : dataEdit.id
    });
    this.setState ({
      modaledit: !this.state.modaledit,
    });
  };

  // function get image from storage
  selectFoto = () => {
    ImagePicker.showImagePicker (options, response => {
      console.log ('Response = ', response);

      if (response.didCancel) {
        console.log ('User cancelled image picker');
      } else if (response.error) {
        console.log ('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log ('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const fileName = response.fileName;
        const type = response.type;
        const uri = response.uri;
        const fileSize = response.fileSize;

        this.setState ({
          avatarSource: source,
          fileName: fileName,
          type: type,
          uri: uri,
          fileSize: fileSize,
        });
      }
    });
  };

  // function send data
  sendData = () => {
    const {task, desc, is_done, token} = this.state;
    let image = {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.fileName,
    };

    const formData = new FormData ();

    formData.append ('task', task);
    formData.append ('desc', desc);
    formData.append ('image', image);
    formData.append ('is_done', is_done);

    // console.log(formData);
    if (this.state.fileSize >= 1500000) {
      ToastAndroid.show (
        'Foto terlalu besar, maksimal 1,5 MB',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      fetch ('http://restful-api-laravel-7.herokuapp.com/api/todo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then (response => response.json ())
        .then (resjson => {
          const {status} = resjson;
          if (status) {
            alert (status);
            this.props.navigation.goBack ();
          }
        })
        .catch (error => {
          console.log (error);
          ToastAndroid.show (
            'Pastikan Form Terisi Semua!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        });
    }
  };



// function editdata
  editData = () => {
    const {task, desc, is_done, token, id} = this.state;
    let image = {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.fileName,
    };

    const formData = new FormData ();

    formData.append ('task', task);
    formData.append ('desc', desc);
    formData.append ('image', image);
    formData.append ('is_done', is_done);
    formData.append ('_method', 'PUT');

    // console.log(formData);
    if (this.state.fileSize >= 5000000) {
      ToastAndroid.show (
        'Foto terlalu besar, maksimal 1,5 MB',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      fetch (`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then (response => response.json ())
        .then (resjson => {
          console.log(resjson)
          const {status} = resjson;
          if (status) {
            alert (status);
            this.props.navigation.goBack ();
          }
        })
        .catch (error => {
          console.log (error);
          ToastAndroid.show (
            'Pastikan Form Terisi Semua!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        });
    }
  };



  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.dataList.map ((value, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.modalEdit ({
                    task: value.task,
                    desc: value.desc,
                    image: value.image,
                    is_done: value.is_done,
                    id:value.id
                  })}
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
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => this.modalAdd ()}
            style={{margin: 20}}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </ScrollView>
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
              {this.state.uri.length == 0
                ? <TouchableOpacity
                    onPress={() => this.selectFoto ()}
                    style={{alignItems: 'center', marginTop: 20, height: 120}}
                  >
                    <View
                      style={{
                        height: 120,
                        width: 120,
                        backgroundColor: '#4555',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{textAlign: 'center'}}>Select Foto</Text>
                    </View>
                  </TouchableOpacity>
                : <TouchableOpacity
                    onPress={() => this.selectFoto ()}
                    style={{alignItems: 'center', marginTop: 20, height: 120}}
                  >
                    <Image
                      source={this.state.avatarSource}
                      style={{height: 120, width: 120}}
                    />
                  </TouchableOpacity>}
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholder="Task"
                  style={{
                    width: '80%',
                    backgroundColor: '#456',
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  onChangeText={task => this.setState ({task})}
                />
                <TextInput
                  placeholder="Desc"
                  style={{
                    width: '80%',
                    backgroundColor: '#456',
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  onChangeText={desc => this.setState ({desc})}
                />
                <View style={{margin: 20}}>
                  <Button title="Simpan" onPress={() => this.sendData ()} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" visible={this.state.modaledit}>
          <View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => this.modalEdit ()}
                style={{margin: 20}}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{margin: 20, marginTop: 25}}>
              <Text style={{textAlign: 'center'}}>Edit Todo</Text>
              {this.state.uri.length == 0
                ? <TouchableOpacity
                    onPress={() => this.selectFoto ()}
                    style={{alignItems: 'center', marginTop: 20, height: 120}}
                  >
                    <Image
                      source={{
                        uri: `http://restful-api-laravel-7.herokuapp.com/img/${this.state.uri}`,
                      }}
                      style={{height: 120, width: 120}}
                    />
                  </TouchableOpacity>
                : <TouchableOpacity
                    onPress={() => this.selectFoto ()}
                    style={{alignItems: 'center', marginTop: 20, height: 120}}
                  >
                    <Image
                      source={this.state.avatarSource}
                      style={{height: 120, width: 120}}
                    />
                  </TouchableOpacity>}
              <View style={{alignItems: 'center'}}>
                <TextInput
                  value={this.state.task}
                  placeholder="Task"
                  style={{
                    width: '80%',
                    backgroundColor: '#456',
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  onChangeText={task => this.setState ({task})}
                />
                <TextInput
                  value={this.state.desc}
                  placeholder="Desc"
                  style={{
                    width: '80%',
                    backgroundColor: '#456',
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  onChangeText={desc => this.setState ({desc})}
                />
                <Text onPress={()=> this.setState({is_done: !this.state.is_done})}>{this.state.is_done==false ? 'Belum Selesai' : 'Selesai'}</Text>
                <View style={{margin: 20}}>
                  <Button title="Edit Data" onPress={() => this.editData ()} />
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
