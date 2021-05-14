import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteResult, storeResult, increment, decrement, add, subtract } from '../../store/actions/Actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

const counter = (props: any) => (
  <div>
    <CounterOutput value={props.ctr} />
    <CounterControl label="Increment" clicked={props.onIncrementCounter} />
    <CounterControl label="Decrement" clicked={() => props.onDecrementCounter()} />
    <CounterControl label="Add 5" clicked={() => props.onAdd(5)} />
    <CounterControl label="Subtract 5" clicked={() => props.onSub(5)} />
    <hr />
    <button onClick={() => props.onStoreResult(props.ctr)}>Store Result</button>
    <ul>
      {props.storedResults.map((strResult: any) => (
        <li key={strResult.id} onClick={() => props.onDeleteResult(strResult.id)}>
          {strResult.value}
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = (state: any) => {
  return {
    ctr: state.counter,
    storedResults: state.results,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrementCounter: () => dispatch(increment()),
    onDecrementCounter: () => dispatch(decrement()),
    onAdd: (val: any) => dispatch(add(val)),
    onSub: (val: any) => dispatch(subtract(val)),
    onStoreResult: (result: any) => dispatch(storeResult(result)),
    onDeleteResult: (id: any) => dispatch(deleteResult(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(counter);
