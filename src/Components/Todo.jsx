import React from 'react';

const Todo = (props) => {
  return (
    <div>
      <input onChange={props.completeTodo} type="checkbox" name="todo" id={props.id} checked={props.isCompleted} />
      <label className={props.isCompleted ? 'completed' : ''} htmlFor={props.id}>{props.value}</label>  
    </div>
  );
};

export default Todo;