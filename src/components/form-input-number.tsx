import React, { ChangeEvent } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  obrigatory: boolean;
  readonly?: boolean;
  value?: number;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputNumber(props: IProps): JSX.Element {
  return (
    <Col sm={`${props.colSm}`}>
      <FormGroup>
        <Label for={`${props.id}`}>
          {props.label}
          {props.obrigatory ? <span style={{ color: 'red' }}>*</span> : ''}:
        </Label>
        <Input
          type="number"
          id={`${props.id}`}
          bsSize="sm"
          style={{ width: '100%' }}
          onChange={(e) => props.onChange(e)}
          value={props.value}
          readOnly={props.readonly ? true : false}
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
