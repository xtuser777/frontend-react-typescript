import React, { ChangeEvent, ReactNode } from 'react';
import { Col, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  groupText: ReactNode;
  obrigatory: boolean;
  value?: string;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputGroupPassword(props: IProps): JSX.Element {
  return (
    <Col sm={`${props.colSm}`}>
      <FormGroup>
        <Label for={`${props.id}`}>
          {props.label}
          {props.obrigatory ? <span style={{ color: 'red' }}>*</span> : ''}:
        </Label>
        <InputGroup style={{ width: '100%' }}>
          <InputGroupText>{props.groupText}</InputGroupText>
          <Input
            type="password"
            id={`${props.id}`}
            bsSize="sm"
            value={props.value}
            onChange={(e) => props.onChange(e)}
          />
        </InputGroup>
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