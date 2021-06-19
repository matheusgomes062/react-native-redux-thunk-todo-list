import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './actionTypes';

let nextTodoId = 0;

export const addTodo = (task) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    task
  }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id
  }
});

export const editTodo = (id, task) => ({
  type: EDIT_TODO,
  payload: {
    id,
    task
  }
});
