import React, { ChangeEvent, ReactNode } from 'react';
import { Col, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import $ from 'jquery';
import 'jquery-mask-plugin';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  groupText: ReactNode;
  obrigatory: boolean;
  mask?: string;
  maskReversal?: true;
  maskPlaceholder?: string;
  value?: string;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputGroupText(props: IProps): JSX.Element {
  $(() => {
    if (props.mask) {
      $(`#${props.id}`).mask(props.mask, {
        reverse: props.maskReversal ? props.maskReversal : false,
        placeholder: props.maskPlaceholder ? props.maskPlaceholder : '',
      });
    }
  });

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
