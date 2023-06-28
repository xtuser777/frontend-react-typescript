import React, { ChangeEvent } from 'react';
import { Row } from 'reactstrap';
import { FormInputText } from './form-input-text';
import { FormInputDate } from './form-input-date';

interface IFields {
  name: string;
  errorName?: string;
  cpf: string;
  errorCpf?: string;
  birth: string;
  errorBirth?: string;
  readonly?: boolean;
}

interface IHandle {
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCpfChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBirthChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IProps {
  fields: IFields;
  handleChanges: IHandle;
}

export function FormIndividualPerson(props: IProps): JSX.Element {
  return (
    <>
      <Row>
        <FormInputText
          colSm={6}
          id="nome"
          label="Nome"
          obrigatory
          value={props.fields.name}
          onChange={(e) => props.handleChanges.handleNameChange(e)}
          message={props.fields.errorName ? props.fields.errorName : undefined}
          readonly={props.fields.readonly ? true : false}
        />
        <FormInputText
          colSm={3}
          id="cpf"
          label="CPF"
          obrigatory
          mask="000.000.000-00"
          value={props.fields.cpf}
          onChange={(e) => props.handleChanges.handleCpfChange(e)}
          message={props.fields.errorCpf ? props.fields.errorCpf : undefined}
          readonly={props.fields.readonly ? true : false}
        />
        <FormInputDate
          colSm={3}
          id="nasc"
          label="Nascimento"
          obrigatory
          value={props.fields.birth}
          onChange={(e) => props.handleChanges.handleBirthChange(e)}
          message={props.fields.errorBirth ? props.fields.errorBirth : undefined}
          readonly={props.fields.readonly ? true : false}
        />
      </Row>
    </>
  );
}
