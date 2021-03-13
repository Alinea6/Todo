import React, { Component } from 'react';
import { CheckBox, Body, ListItem } from 'native-base';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

class DoneList extends Component {
  onPressItem = (item) => {
    this.props.addToTasks(item);
    this.props.removeFromDoneTasks(item)
  }
  
  render(){
    return(
    <View styles={styles.container}>
      <Text style={styles.title}>Completed:</Text>
      <FlatList 
      data={this.props.doneTasks}
      renderItem={({ item, index }) => (
        <ListItem style={styles.item}>
          <CheckBox style={styles.checkbox} checked={true}/>
          <Body><Text style={styles.text} onPress={()=>this.onPressItem(item)}>{item}</Text></Body>
        </ListItem>
      )}
      keyExtractor={(item, index) => 'key'+index}/>
    </View>
    )}
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    paddingHorizontal: 12,
    textDecorationLine: "line-through" 
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

export default DoneList;