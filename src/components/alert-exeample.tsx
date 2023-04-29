import React, { useState } from 'react';
import { Alert } from 'reactstrap';

export function AlertExample(props: { message: string }): JSX.Element {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      {props.message}
    </Alert>
  );
}

export default AlertExample;
