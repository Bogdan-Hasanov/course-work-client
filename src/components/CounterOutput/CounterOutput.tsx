import React from 'react';

import './CounterOutput.css';

interface CounterControlProps {
  value: number;
}

const counterOutput = (props: CounterControlProps) => (
  <div className="CounterOutput">Current Counter: {props.value}</div>
);

export default counterOutput;
