/* 
Grocery app for me and wifey - BrandonSM
*/

import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

/* Imports Firebase from package */
import * as firebase from 'firebase';

/* Initialize Firebase code */
const firebaseConfig = {
  apiKey: "AIzaSyAj2m0HnMjnFrruqUzKF1Q7ca0My0RK0bk",
  authDomain: "test-groceryapp.firebaseapp.com",
  databaseURL: "https://test-groceryapp.firebaseio.com",
  storageBucket: "test-groceryapp.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

/* Import styles */
const styles = require('./assets/styles/styles.js')

/* Imports components */
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');

/* Main App code */
class GroceryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
     })
    };

    this.itemsRef = firebaseApp.database().ref();
  }

  componentDidMount() {
    /* Sets the initial state of the component */
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })

    /* Adds the event listener to the component after the state is set */
    this.listenForItems(this.itemsRef);
  }

  /* This happens after data is changed in the UI */
  _renderItem(item) {

    /* This happens..... */
    const onPress = () => {
      AlertIOS.prompt(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
        'default'
      );
    };

    return (
      <ListItem item={item} onPress={onPress}/>
    );
  }

  /* Adds the event listener that triggers when clicking on each of the items in the list.
     Be sure to use 'value' as 'name' is being deprecated. */
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      /* get children as an array */
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  /* Action that happens when the "ADD" button is clicked" */
  _addItem() {
    /* Prompts the iOS alert to get the user input for the name of the item */
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List"/>

        <ListView 
          dataSource={this.state.dataSource} 
          renderRow={this._renderItem.bind(this)} 
          style={styles.listview}
          enableEmptySections={true} />

        <ActionButton 
          title="Add"  
          onPress={this._addItem.bind(this)} />

      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
