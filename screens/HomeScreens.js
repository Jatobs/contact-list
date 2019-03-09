import React from 'react';
import { Header, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';

export default class HomeScreen extends React.Component {
constructor() {
  super();

  this.state = {
    list: [],
    isLoading: true
  }
}

static navigationOptions = {
  header: null
}

componentDidMount() {
  
  fetch("https://reqres.in/api/users?per_page=20")
    .then(res => res.json())
    .then(res => {
      this.setState({
        list: res.data,
        isLoading: false
      });
    })
}

keyExtractor = (item, index) => index.toString();

renderItem = ({ item }) => (
  <ListItem
    title={item.first_name}
    leftAvatar={{ source: { uri: item.avatar } }}
    onPress={() => this.props.navigation.navigate('Profile', { userId: item.id })}
    chevron
    bottomDivider
  />
)


  render() {
    if (this.state.isLoading) {
      return(
        <View style={[styles.container, styles.centered]}>
             <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff' }}
          centerComponent={{ text: 'Lista de contatos', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={{ icon: 'add', color: '#fff' }}
        />

        <FlatList
          data={this.state.list}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  topbar: {
    backgroundColor: '#0251d1',
    paddingTop: 39,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textbar: {
    fontSize: 20,
    color: 'white'
  },

  listItem: {
    fontSize: 18,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center'
  },

  listText: {
    fontSize: 18,

  },

  listImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },

});
