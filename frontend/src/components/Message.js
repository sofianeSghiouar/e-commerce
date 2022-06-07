import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Message(props) {
  return (
    <Alert key={props.variant} variant={props.variant || 'info'}>
      {props.children}
    </Alert>
  );
}

export default Message;
