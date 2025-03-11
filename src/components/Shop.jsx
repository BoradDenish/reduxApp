import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useSelector } from 'react-redux'

import { increment, decrement, incrementByAmount } from '../state/counterSlice';
import { addTodo, toggleTodo, deleteTodo } from '../state/todoSlice';
import { login, logout } from "../state/authSlice";
    
export default function Shop() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos);

  const amount = useSelector(state => state.amount);
  const dispatch = useDispatch();
  const {depositMoney, withdrawMoney} = bindActionCreators(actionCreators, dispatch);

  const count = useSelector((state) => state.counter.value);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleLogin = () => {
    const userInfo = { name: "John Doe", email: "john@example.com" };
    dispatch(login(userInfo));
  };

  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <>
      <div className='container py-3'>
        <h3>Deposit/Withdraw Money</h3>
        {/* <button className='btn btn-primary mx-2' onClick={() => {dispatch(actionCreators.withdrawMoney(100))}}> - </button>
        Update Balance is: {amount}
        <button className='btn btn-primary mx-2' onClick={() => {dispatch(actionCreators.depositMoney(100))}}> + </button> */}

        <button className='btn btn-primary mx-2' onClick={() => {withdrawMoney(100)}}> - </button>
        Update Balance is: <strong>{amount}</strong>
        <button className='btn btn-primary mx-2' onClick={() => {depositMoney(100)}}> + </button>
      </div>
      <div className='container py-3'>
        <h1>Counter: {count}</h1>
        <button className='btn btn-primary mx-2' onClick={() => dispatch(increment())}>+</button>
        <button className='btn btn-primary mx-2' onClick={() => dispatch(decrement())}>-</button>
        <button className='btn btn-primary mx-2' onClick={() => dispatch(incrementByAmount(5))}>+ by 5</button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>📝 Redux Todo App</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>

    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>🔐 Redux Authentication</h2>

      {isAuthenticated ? (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>Please log in</h3>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
    </>
  )
}
