import React from 'react';
import { Header, ListItem, Icon, Image, Avatar } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default class ProfileScreen extends React.Component {
constructor() {
  super();

  this.state = {
    user: {},
    isLoading: true
  }
}

static navigationOptions = {
    header: null
  }

componentDidMount() { 
    const { navigation } = this.props;
    const userId = navigation.getParam('userId');

  fetch(`https://reqres.in/api/users/${userId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        user: res.data,
        isLoading: false
      });
    })
}

  render() {
    if (this.state.isLoading) {
      return(
        <View style={[styles.container, styles.centered]}>
             <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    const { user } = this.state;


    return (
      <View style={styles.container}>
        <Header
          leftComponent={<Icon name="home"  color= '#fff' onPress={() => this.props.navigation.navigate("Home")} />}
          centerComponent={{ text: user.first_name, style: { color: '#fff', fontSize: 20 } }}
          rightComponent={{ icon: 'add', color: '#fff' }}
        />

        <View>
        <Avatar
            rounded
            size="xlarge"
                source={{
                    uri: user.avatar
                }}
            />
            <Text h2> { user.first_name } { user.last_name }</Text>
        </View>
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
