import React from 'react';
import { Button } from 'reactstrap';

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

export function Button1(props: Props): JSX.Element {
  return <Button text={props.text} className={props.className} onClick={props.onClick} />;
}
