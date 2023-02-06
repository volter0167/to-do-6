import React, {useState, useEffect} from 'react';
import Todo from './Todo';
import {nanoid} from 'nanoid'

const TodoList = () => {
  const [todo, setTodo] = useState(() => getTodoFromLocalStorage())

  const [newTodoValue, setNewTodoValue] = useState({
    newTodo: ''
  })

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo))
  }, [todo])

  function getTodoFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todo') || '[]')
  }

  function handleCreatingTodo() {
    if(!newTodoValue.newTodo) {
      return
    }

    setTodo(prevTodo => [
      ...prevTodo,
      {
          id: nanoid(),
          value: newTodoValue.newTodo,
          completed: false
      },
    ])
    setNewTodoValue({newTodo: ''})
  }

  function handleCreateTodo(e) {
    const {value, name} = e.target;

    setNewTodoValue(() => ({
      [name]: value  
    }))
  }

  function completeTodo(id) {
    setTodo(prevTodo => prevTodo.map(todo => {
      return (todo.id === id ? {
        ...todo,
        completed: !todo.completed
      } :
      todo)
    }))
  }

  function clearCompleted() {
    setTodo(prevTodo => prevTodo.filter(todo => !todo.completed))
  }

  const renderedTodo = todo.map(({id, value, completed}) => <Todo 
      completeTodo={() => completeTodo(id)}
      key={id}
      id={id} 
      value={value} 
      isCompleted={completed} 
    />)

  return (
    <div>
      <input type="text" name="newTodo" onChange={handleCreateTodo} value={newTodoValue.newTodo} />
      <button onClick={handleCreatingTodo}>Create</button>
      <button onClick={clearCompleted}>Clear Completed</button>
      {renderedTodo}
    </div>
  );
};

export default TodoList;