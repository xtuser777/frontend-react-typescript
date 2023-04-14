import React, { ChangeEvent, ReactNode } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import InputMask from 'react-input-mask';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  obrigatory: boolean;
  children?: ReactNode;
  mask?: string;
  value?: string;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputText(props: IProps): JSX.Element {
  return (
    <Col sm={`${props.colSm}`}>
      <FormGroup>
        <Label for={`${props.id}`}>
          {props.label}
          {props.obrigatory ? <span style={{ color: 'red' }}>*</span> : ''}:
        </Label>
        <Input
          type="text"
          id={`${props.id}`}
          bsSize="sm"
          mask={props.mask ? props.mask : ''}
          tag={InputMask}
          style={{ width: '100%' }}
          onChange={(e) => props.onChange(e)}
          value={props.value}
        />
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
