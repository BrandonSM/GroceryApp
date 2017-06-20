/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Imports Firebase from package
import * as firebase from 'firebase';

// Initialize Firebase code
const firebaseConfig = {
  apiKey: "AIzaSyAj2m0HnMjnFrruqUzKF1Q7ca0My0RK0bk",
  authDomain: "test-groceryapp.firebaseapp.com",
  databaseURL: "https://test-groceryapp.firebaseio.com",
  storageBucket: "test-groceryapp.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Import styles
const styles = require('./assets/styles/styles.js')

// Imports components
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');

// Main App code
class GroceryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
     })
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
  }

  _renderItem(item) {
    return (
      <ListItem item={item} onpress={this} />
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List"/>

        <ListView 
          dataSource={this.state.dataSource} 
          renderRow={this._renderItem.bind(this)} 
          style={styles.listview} />

        <ActionButton 
          title="Add"  
          onpress={this} />

      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
