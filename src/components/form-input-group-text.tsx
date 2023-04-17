import React, { ChangeEvent, ReactNode } from 'react';
import { Col, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import InputMask from 'react-input-mask';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  groupText: ReactNode;
  obrigatory: boolean;
  mask?: string;
  value?: string;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputGroupText(props: IProps): JSX.Element {
  return (
    <Col sm={`${props.colSm}`}>
      <FormGroup>
        <Label for={`${props.id}`}>
          {props.label}
          {props.obrigatory ? <span style={{ color: 'red' }}>*</span> : ''}:
        </Label>
        <InputGroup size="sm" style={{ width: '100%' }}>
          <InputGroupText>{props.groupText}</InputGroupText>
          <Input
            type="text"
            id={`${props.id}`}
            bsSize="sm"
            mask={props.mask ? props.mask : ''}
            tag={InputMask}
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
