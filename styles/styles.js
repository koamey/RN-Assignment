import {StyleSheet} from 'react-native';

export default globalStyles = StyleSheet.create({
  inputView: {
    backgroundColor: '#f3f2f2',
    borderRadius: 30,
    width: '90%',
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
  floatingButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  floatingButtonText: {
    fontSize: 40,
    paddingLeft: 3,
    paddingBottom: 5,
  },
});


