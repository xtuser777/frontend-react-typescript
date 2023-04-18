import React, { ChangeEvent } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import $ from 'jquery';
import 'jquery-mask-plugin';

interface IProps {
  colSm: number;
  label: string;
  id: string;
  obrigatory: boolean;
  readonly?: boolean;
  mask?: string;
  maskReversal?: true;
  maskPlaceholder?: string;
  placeholder?: string;
  value?: string;
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInputText(props: IProps): JSX.Element {
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
        <Input
          type="text"
          id={`${props.id}`}
          bsSize="sm"
          style={{ width: '100%' }}
          onChange={(e) => props.onChange(e)}
          value={props.value}
          placeholder={props.placeholder ? props.placeholder : ''}
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
