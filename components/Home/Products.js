import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {addProduct, deleteProduct} from '../../actions/product';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
  Button,
} from 'react-native';

class Products extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    Icon.loadFont();
  };

  state = {
    productName: '',
    productDesc: '',
    products: [],
    addProductModalVisible: false,
    logoutModalVisible: false,
    deleteModalVisible: false,
    isEditable: false,
    selectedFilterValue: 'java',
  };

  resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Login' }),
    ],
  });

  onPressAddProduct = async () => {
    if (this.state.productName.trim() === '') {
      return;
    }
    if (this.state.productDesc === '') {
      this.state.productDesc = 'No description available.';
    }
    this.props.add(this.state.productName, this.state.productDesc);
    await this.setState({
      productName: '',
    });
    await this.setState({
      productDesc: '',
    });
    this.openAddProductModal(false);
  };

  openAddProductModal = async (visible) => {
    await this.setState({addProductModalVisible: visible});
  };

  openLogoutModal = async (visible, logout) => {
    await this.setState({logoutModalVisible: visible});
    if(logout && logout === 'yes'){
      this.props.navigation.navigate('Login');
      // this.props.navigation.dispatch(this.resetAction);
    }
  };

  openDeleteModal = async (visible) => {
    await this.setState({deleteModalVisible: visible});
  };

  onPressDeleteProduct = (id, index) => {
    if (index > -1) {
      this.props.delete(id);
    }
  };

  onChangeProductName = async (value) => {
    await this.setState({
      productName: value,
    });
  };

  onChangeProductDesc = async (value) => {
    await this.setState({
      productDesc: value,
    });
  };

  onPressReloadImage = () => {};

  renderAddModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.addProductModalVisible}
        onRequestClose={() => {
          this.onPressAddProduct(!this.state.addProductModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={globalStyles.inputView}>
              <TextInput
                style={globalStyles.TextInput}
                placeholder="Enter product title"
                placeholderTextColor="#000000"
                value={this.state.productName}
                onChangeText={this.onChangeProductName}
                autoFocus={true}
              />
            </View>
            <View style={globalStyles.inputView}>
              <TextInput
                style={globalStyles.TextInput}
                placeholder="Enter product description"
                placeholderTextColor="#000000"
                value={this.state.productDesc}
                onChangeText={this.onChangeProductDesc}
                // autoFocus={true}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '50%',
              }}>
              <Button
                onPress={() => {
                  this.openAddProductModal(!this.state.addProductModalVisible);
                }}
                title="Cancel"
                style={styles.modalCloseButton}
              />
              <Button
                onPress={() => {
                  this.onPressAddProduct(!this.state.addProductModalVisible);
                }}
                title="Add"
                style={styles.modalCloseButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  renderLogoutModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.logoutModalVisible}
        onRequestClose={() => {
          this.openLogoutModal(!this.state.logoutModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.deleteTextContainer}>
              <Text style={styles.deleteText}>
                Are you sure you want to log out?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '50%',
              }}>
              <Button
                onPress={() => {
                  this.openLogoutModal(!this.state.logoutModalVisible);
                }}
                title="No"
                style={styles.modalCloseButton}
              />
              <Button
                onPress={() => {
                  this.openLogoutModal(!this.state.logoutModalVisible, 'yes');
                }}
                title="Yes"
                style={styles.modalCloseButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  renderDeleteModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.logoutModalVisible}
        onRequestClose={() => {
          this.openDeleteModal(!this.state.logoutModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.deleteTextContainer}>
              <Text style={styles.deleteText}>
                Are you sure you want to delete this product?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '50%',
              }}>
              <Button
                onPress={() => {
                  this.openDeleteModal(!this.state.deleteModalVisible);
                }}
                title="No"
                style={styles.modalCloseButton}
              />
              <Button
                onPress={() => {
                  this.openDeleteModal(!this.state.deleteModalVisible);
                }}
                title="Yes"
                style={styles.modalCloseButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  renderProduct = (product, index) => {
    return (
      <View style={styles.listItemContainer}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <View>
            {/* <Text style={styles.productTitleText}>{product.productName}</Text>
            <Text style={styles.productDescriptionText}>
              {product.productDesc}
            </Text> */}
            {this.renderEditable(product)}
          </View>
          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              width: '15%',
            }}>
            <Icon.Button
              name="pencil"
              size={20}
              iconStyle={{paddingLeft: 8}}
              color="#000000"
              backgroundColor="#f0f0f0"
              onPress={() => {
                this.onPressAddProduct();
              }}
            />
            <Icon.Button
              name="trash"
              size={23}
              iconStyle={{paddingLeft: 8}}
              color="#000000"
              backgroundColor="#f0f0f0"
              onPress={() => {
                this.onPressDeleteProduct(product.id, index);
              }}
            />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Text style={{color: '#787777'}}>
            Failed to load Image{'   '}
            <Icon
              name="refresh"
              size={20}
              color="#787777"
              onPress={() => {
                this.onPressReloadImage();
              }}
            />
          </Text>
        </View>
      </View>
    );
  };

  productsList = () => {
    return (
      <>
        {/* <View style={styles.divider} /> */}
        <FlatList
          style={styles.listContainer}
          data={this.props.products}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({item, index}) => this.renderProduct(item, index)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </>
    );
  };

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#808080',
        height: 1,
        margin: 5,
      }}
    />
  );

  renderHeader = () => {
    return (
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <View
            style={{
              textAlign: 'left',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon.Button
              name="arrow-left"
              size={20}
              iconStyle={{paddingLeft: 8}}
              color="#000000"
              backgroundColor="#cccccc"
              onPress={() => {
                this.openLogoutModal(true);
              }}
            />
          </View>
        </View>
        <Text style={styles.headerText}>Products</Text>
        <View style={styles.rightContainer}>
          <Icon.Button
            name="plus"
            size={20}
            iconStyle={{paddingLeft: 8}}
            color="#000000"
            backgroundColor="#cccccc"
            onPress={() => {
              this.openAddProductModal(true);
            }}
          />
        </View>
      </View>
    );
  };

  renderEditable = (product) => {
    if (this.state.isEditable) {
      return;
    }
    return (
      <View>
        <Text style={styles.productTitleText}>{product.productName}</Text>
        <Text style={styles.productDescriptionText}>{product.productDesc}</Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        {this.renderAddModal()}
        {this.renderLogoutModal()}
        {this.renderHeader()}
        <View style={styles.container}>
          <View style={styles.listContainer}>{this.productsList()}</View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  divider: {
    height: 2,
    backgroundColor: 'black',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  productInput: {
    width: '70%',
    padding: 5,
  },
  productButton: {
    width: '30%',
  },
  listContainer: {
    width: '100%',
    paddingBottom: 100,
  },
  listItemContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  productTitleText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  productDescriptionText: {
    fontSize: 15,
  },
  imageContainer: {
    height: 150,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginBottom: 5,
    borderColor: '#ebe9e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#ebe9e8',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBottom: {
    height: 2,
    backgroundColor: '#c9c8c7',
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  deleteTextContainer: {
    padding: 10,
    marginBottom: 15,
    width: '95%',
  },
  deleteText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cccccc',
    // padding: 10,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor: 'green'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    // backgroundColor: 'white',
  },
  modalHeader: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    marginBottom: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name, desc) => {
      dispatch(addProduct(name, desc));
    },
    edit: (index) => {
      dispatch(editProduct(index));
    },
    delete: (index) => {
      dispatch(deleteProduct(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
