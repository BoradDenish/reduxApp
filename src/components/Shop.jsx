import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

export default function Shop() {
  const dispatch = useDispatch();
  const {depositMoney, withdrawMoney} = bindActionCreators(actionCreators, dispatch);
  return (
    <div className='container'>
      <h3>Deposit/Withdraw Money</h3>
      {/* <button className='btn btn-primary mx-2' onClick={() => {dispatch(actionCreators.withdrawMoney(100))}}> - </button>
      Update Balance
      <button className='btn btn-primary mx-2' onClick={() => {dispatch(actionCreators.depositMoney(100))}}> + </button> */}

      <button className='btn btn-primary mx-2' onClick={() => {withdrawMoney(100)}}> - </button>
      Update Balance
      <button className='btn btn-primary mx-2' onClick={() => {depositMoney(100)}}> + </button>
    </div>
  )
}
