import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useSelector } from 'react-redux'

import { increment, decrement, incrementByAmount } from '../state/counterSlice';
    
export default function Shop() {
  const amount = useSelector(state => state.amount);
  const dispatch = useDispatch();
  const {depositMoney, withdrawMoney} = bindActionCreators(actionCreators, dispatch);

  const count = useSelector((state) => state.counter.value);
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
    </>
  )
}
