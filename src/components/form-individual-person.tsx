import React, { ChangeEvent } from 'react';
import { Row } from 'reactstrap';
import { FormInputText } from './form-input-text';
import { FormInputDate } from './form-input-date';

interface IFields {
  name: string;
  rg: string;
  cpf: string;
  birthDate: string;
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
          colSm={12}
          id="nome"
          label="Nome"
          obrigatory
          value={props.fields.name}
          onChange={(e) => props.handleChanges.handleNameChange(e)}
        />
      </Row>
      <Row>
        <FormInputText
          colSm={4}
          id="rg"
          label="Rg"
          obrigatory
          value={props.fields.rg}
          onChange={(e) => props.handleChanges.handleRgChange(e)}
        />
        <FormInputText
          colSm={4}
          id="cpf"
          label="CPF"
          obrigatory
          mask="000.000.000-00"
          value={props.fields.cpf}
          onChange={(e) => props.handleChanges.handleCpfChange(e)}
        />
        <FormInputDate
          colSm={4}
          id="nasc"
          label="Nascimento"
          obrigatory
          value={props.fields.birthDate}
          onChange={(e) => props.handleChanges.handleBirthDateChange(e)}
        />
      </Row>
    </>
  );
}
