import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { queryAllKeepItems, insertKeepItem, deleteAllKeepItems } from '../databases/allSchemas';
import realm from '../databases/allSchemas';

export default class Keep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keepItems: [],
    }
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    })
  }

  reloadData = () => {
    queryAllKeepItems().then((keepItems) => {
      // alert(JSON.stringify(keepItems, null, 4))
      this.setState({ keepItems });
    }).catch((error) => {
      this.setState({ keepItems: [] });
    });
    console.log('Reloading data...')
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>
        Hello World!
        </Text>
        <FlatList data={this.state.keepItems}
          renderItem={({index, item}) => <Text key={item.id}>{`id: ${item.id}, Text: ${item.text}`}</Text>}
          keyExtractor={(item) => `${item.id}` }
        />
        <Button title="Add Item" onPress={ () => insertKeepItem({ id: Math.floor( Date.now() / 100 ), text: 'Test'})} style={{width:50, flex: 1, position: "absolute"}}/>
        <Button title="Delete All" onPress={ () => deleteAllKeepItems()} style={{width:50, flex: 1, position: "absolute"}}/>
      </View>
    )
  }
}