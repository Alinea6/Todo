import React, { Component } from 'react';
import { CheckBox, Body, ListItem } from 'native-base';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

class List extends Component {
  componentDidMount(){
    this.props.loadFromDatabase()
  }
  
  onPressItem = (item) => {
    this.props.addToDoneTasks(item)
    this.props.removeFromTasks(item)
    this.props.loadFromDatabase()
  }
  
  render(){
    return(
    <View styles={styles.container}>
      <Text style={styles.title}>Planned:</Text>
      <FlatList 
      data={this.props.tasks}
      renderItem={({ item, index }) => (
        <ListItem style={styles.item} onPress={() =>this.onPressItem(item)}>
          <CheckBox style={styles.checkbox} checked={false}/>
          <Body><Text style={styles.text}>{item}</Text></Body>
        </ListItem>
      )}
      keyExtractor={(item, index) => 'key'+index}/>
    </View>
    )}
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    paddingHorizontal: 12 
  },
  title: {
    fontSize: 20,
    padding: 5,
    marginHorizontal: 10
  },
  item: {
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 15,
    backgroundColor: "#333333",
    paddingHorizontal: 3,
    marginVertical: 5
  },
  checkbox: {
    marginLeft: 5
  }
})

export default List;