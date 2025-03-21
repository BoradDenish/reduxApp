import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useSelector } from 'react-redux'

import { increment, decrement, incrementByAmount } from '../state/counterSlice';
import { addTodo, toggleTodo, deleteTodo } from '../state/todoSlice';
import { login, logout } from "../state/authSlice";
import { addToCart, removeFromCart } from "../state/cartSlice";
import { toggleTheme } from "../state/themeSlice";
import { addContact, editContact, deleteContact } from "../state/contactSlice";
import { v4 as uuidv4 } from "uuid";

import { addEvent, editEvent, deleteEvent } from "../state/eventSlice";

export default function Shop() {

  const events = useSelector((state) => state.events);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [edit1Id, setEdit1Id] = useState(null);

  const handleAddEvent = () => {
    if (title && date) {
      if (edit1Id) {
        dispatch(editEvent({ id: edit1Id, title, date }));
        setEdit1Id(null);
      } else {
        dispatch(addEvent({ id: uuidv4(), title, date }));
      }
      setTitle("");
      setDate("");
    }
  };

  const contacts = useSelector((state) => state.contacts);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editId, setEditId] = useState(null);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // This for cart
  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // This for auth check
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // This for todo crud
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

  const products = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Phone", price: 300 },
    { id: 3, name: "Headphones", price: 100 }
  ];

  const handleAddContact = () => {
    if (name && phone) {
      if (editId) {
        dispatch(editContact({ id: editId, name, phone }));
        setEditId(null);
      } else {
        dispatch(addContact({ id: uuidv4(), name, phone }));
      }
      setName("");
      setPhone("");
    }
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

    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>🛒 Redux Shopping Cart</h2>

      <h3>Products</h3>
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <span>{item.name} x {item.quantity} - ${item.price * item.quantity}</span>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        ))
      )}

      <h3>Total Amount: ${totalAmount}</h3>
    </div>

    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#000"
      }}
    >
      <h2>🌗 Redux Theme Switcher</h2>
      <button onClick={() => dispatch(toggleTheme())}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>

    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📞 Redux Contact List</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleAddContact}>
        {editId ? "Update Contact" : "Add Contact"}
      </button>

      <h3>Contact List</h3>
      {contacts.length === 0 ? <p>No contacts added</p> : (
        contacts.map((contact) => (
          <div key={contact.id}>
            <span>{contact.name} - {contact.phone}</span>
            <button onClick={() => { setEditId(contact.id); setName(contact.name); setPhone(contact.phone); }}>
              Edit
            </button>
            <button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
    
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📅 Redux Event Management</h2>

      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAddEvent}>
        {editId ? "Update Event" : "Add Event"}
      </button>

      <h3>Event List</h3>
      {events.length === 0 ? <p>No events added</p> : (
        events.map((event) => (
          <div key={event.id}>
            <span>{event.title} - {event.date}</span>
            <button onClick={() => { setEdit1Id(event.id); setTitle(event.title); setDate(event.date); }}>
              Edit
            </button>
            <button onClick={() => dispatch(deleteEvent(event.id))}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
    
    </>
  )
}
