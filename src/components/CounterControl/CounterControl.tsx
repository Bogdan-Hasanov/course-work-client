import React from 'react';

import './CounterControl.css';

interface CounterControlProps {
  clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  label: string;
}

const counterControl = (props: CounterControlProps) => (
  <div className="CounterControl" onClick={props.clicked}>
    {props.label}
  </div>
);

export default counterControl;
