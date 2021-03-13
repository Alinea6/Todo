import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class AddToList extends Component{
  constructor() {
    super()
    this.state={
      newTask: '',
      changeText: ''
    }
  }

  onSubmitTask = () => {
    if (this.state.newTask.length){
      this.props.addToTasks(this.state.newTask)
      this.setState({newTask: ''})
      this.props.loadFromDatabase()
      this.setState({newTask: ''})
    }
    
  }
  
  render(){
    return (
      <View style={styles.container}>  
      <TextInput 
      style={{ height: 25, width: 315, fontSize: 20, padding: 0, marginVertical: 20,
      borderBottomWidth: 1, borderBottomColor: "#333333", marginLeft: 'auto',
    marginRight: 'auto' }}
      placeholder="New task description"
      onChangeText={value => this.setState({ newTask: value })}
      value={this.state.newTask}
      clearButtonMode='always' />
      <TouchableOpacity onPress={this.onSubmitTask}>
        <Text style={styles.button}>Add task</Text>
      </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  button: {
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    marginTop: 3,
    backgroundColor: "#2196F3"
  }
})

export default AddToList