import React, { ChangeEvent } from 'react';
import { Row } from 'reactstrap';
import { FormInputText } from './form-input-text';
import { FormInputDate } from './form-input-date';

interface IFields {
  name: string;
  errorName?: string;
  rg: string;
  errorRg?: string;
  cpf: string;
  errorCpf?: string;
  birthDate: string;
  errorBirthDate?: string;
}

interface IHandle {
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRgChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCpfChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
        />
        <FormInputText
          colSm={2}
          id="rg"
          label="Rg"
          obrigatory
          value={props.fields.rg}
          onChange={(e) => props.handleChanges.handleRgChange(e)}
          message={props.fields.errorRg ? props.fields.errorRg : undefined}
        />
        <FormInputText
          colSm={2}
          id="cpf"
          label="CPF"
          obrigatory
          mask="000.000.000-00"
          value={props.fields.cpf}
          onChange={(e) => props.handleChanges.handleCpfChange(e)}
          message={props.fields.errorCpf ? props.fields.errorCpf : undefined}
        />
        <FormInputDate
          colSm={2}
          id="nasc"
          label="Nascimento"
          obrigatory
          value={props.fields.birthDate}
          onChange={(e) => props.handleChanges.handleBirthDateChange(e)}
          message={props.fields.errorBirthDate ? props.fields.errorBirthDate : undefined}
        />
      </Row>
    </>
  );
}
