import React, { ChangeEvent, ReactNode } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  obrigatory: boolean;
  disable?: boolean;
  children?: ReactNode;
  value?: string;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputSelect(props: IProps): JSX.Element {
  return (
    <Col sm={`${props.colSm}`}>
      <FormGroup>
        <Label for={`${props.id}`}>
          {props.label}
          {props.obrigatory ? <span style={{ color: 'red' }}>*</span> : ''}:
        </Label>
        <Input
          type="select"
          id={`${props.id}`}
          bsSize="sm"
          style={{ width: '100%' }}
          value={props.value}
          disabled={props.disable}
          onChange={(e) => props.onChange(e)}
        >
          {props.children}
        </Input>
        <span
          id={`ms-${props.id}`}
          className={props.message ? 'label label-danger' : 'label label-danger hidden'}
        >
          {props.message ? props.message : ''}
        </span>
      </FormGroup>
    </Col>
  );
}