import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Tasks.db' });

import List from './components/List/List';
import AddToList from './components/AddToList/AddToList';
import DoneList from './components/DoneList/DoneList';



class App extends Component {
  
  constructor(props){
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tasks'",
        [],
        function(tx, res){
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tasks', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tasks(task_id INTEGER PRIMARY KEY AUTOINCREMENT, task_text TEXT)',
              []
            );
          }
        }
      );
    });
    this.state = {
      tasks: [],
      doneTasks: []
    }
  }

  loadFromDatabase = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT task_text FROM tasks', [], (tx, results) => {
        var temp = []
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i)["task_text"])
        }
        this.setState({
          tasks: temp
        })
      })
    })
  }

  addToTasks = (newTask) =>{
    db.transaction(function(tx){
      tx.executeSql('INSERT INTO tasks (task_text) VALUES (?)', [newTask],
      (tx, results) => {
        if (results.rowsAffected > 0) {
        }     
      })
    })
  }

  removeFromTasks = (taskToDelete) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tasks where task_text=?', [taskToDelete],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            this.loadFromDatabase()
          }
        }
      )
    })
  }

  addToDoneTasks = (task) => {
    this.setState(state => {
      const doneTasks = state.doneTasks.concat(task);
      return {
        doneTasks
      }
    })
  }

  removeFromDoneTasks = (taskToDelete) => {
    this.setState({doneTasks: this.state.doneTasks.filter(function(doneTask){
      return doneTask !== taskToDelete
    })})
  }
  
  render(){
    return (
      <View style={styles.container}>
        <AddToList style={styles.add} addToTasks={this.addToTasks} loadFromDatabase={this.loadFromDatabase}/>
          <View style={styles.list1}>
            <List loadFromDatabase={this.loadFromDatabase} tasks={this.state.tasks} addToDoneTasks={this.addToDoneTasks} removeFromTasks={this.removeFromTasks}/>
          </View>
          <View style={styles.list2}>
            <DoneList doneTasks={this.state.doneTasks} addToTasks={this.addToTasks} removeFromDoneTasks={this.removeFromDoneTasks}/>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginHorizontal: 15,
    flexDirection: 'column',
    flex: 1
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  add: {
    flex: 2,
    padding: 10
  },
  list1: {
    flex: 9,
    padding: 10,
    marginVertical: 10
  },
  list2: {
    flex: 9,
    padding: 10,
    marginVertical: 10
  }
})

export default App;
