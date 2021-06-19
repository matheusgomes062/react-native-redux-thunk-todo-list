import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../actionTypes';

const initialState = {
  todo_list: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task } = action.payload;
      return {
        ...state,
        todo_list: [...state.todo_list, { id, task }]
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }
    case EDIT_TODO: {
      const { id, task } = action.payload;
      return {
        ...state,
        todo_list: state.todo_list.map((item) => {
          if (item.id === id) {
            return Object.assign({}, item, { task: task });
          }
        })
      };
    }
    default:
      return state;
  }
}
