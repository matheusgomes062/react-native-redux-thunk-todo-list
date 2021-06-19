import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../redux/actions';

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list, addTodo, deleteTodo }) => {
  const [task, setTask] = React.useState('');
  const [taskEdit, setTaskEdit] = React.useState('');
  const [isEditing, setIsEditing] = React.useState('');

  const handleAddTodo = () => {
    addTodo(task);
    setTask('');
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleEditTodo = (id) => {
    editTodo(id, taskEdit);
    setIsEditing(!isEditing);
    setTaskEdit('');
  };

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>
          ToDo App with React Native and Redux
        </Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>

          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={(task) => setTask(task)}
          />
          <Spacer />
          <Button mode="contained" onPress={handleAddTodo}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              <Card>
                <Card.Title
                  title={`Task#${item.id}`}
                  left={(props) => (
                    <Icon name="tasks" size={24} color="black" />
                  )}
                  right={(props) => (
                    <View style={styles.row}>
                      <ButtonIcon
                        iconName="pencil"
                        color="black"
                        onPress={() => handleEditTodo(item.id)}
                      />
                      <ButtonIcon
                        iconName="close"
                        color="red"
                        onPress={() => handleDeleteTodo(item.id)}
                      />
                    </View>
                  )}
                />
                <Card.Content key={item.id}>
                  {isEditing ? (
                    <TextInput
                      mode="outlined"
                      label="Task"
                      value={taskEdit}
                      onChangeText={(taskEdit) => setTaskEdit(taskEdit)}
                      onSubmitEditing={(taskEdit) => handleEditTodo(item.id)}
                    />
                  ) : (
                    <Paragraph>{item.task}</Paragraph>
                  )}
                </Card.Content>
              </Card>
              <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list
  };
};

const mapDispatchToProps = { addTodo, deleteTodo, editTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
