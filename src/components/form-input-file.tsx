import React, { ChangeEvent } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  obrigatory: boolean;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputFile(props: IProps): JSX.Element {
  return (
    <Col sm={`${props.colSm}`}>
      <FormGroup>
        <Label for={`${props.id}`}>
          {props.label}
          {props.obrigatory ? <span style={{ color: 'red' }}>*</span> : ''}:
        </Label>
        <Input
          type="file"
          id={`${props.id}`}
          bsSize="sm"
          style={{ width: '100%' }}
          onChange={(e) => props.onChange(e)}
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
