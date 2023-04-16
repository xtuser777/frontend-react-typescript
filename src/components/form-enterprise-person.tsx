import React, { ChangeEvent } from 'react';
import { Row } from 'reactstrap';
import { FormInputText } from './form-input-text';

interface IFields {
  enterpriseName: string;
  fantasyName: string;
  cnpj: string;
}

interface IHandle {
  handleEnterpriseNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFantasyNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCnpjChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IProps {
  fields: IFields;
  handleChanges: IHandle;
}

export function FormEnterprisePerson(props: IProps): JSX.Element {
  return (
    <>
      <Row>
        <FormInputText
          colSm={12}
          id="razao_social"
          label="Razão Social"
          obrigatory
          value={props.fields.enterpriseName}
          onChange={(e) => props.handleChanges.handleEnterpriseNameChange(e)}
        />
      </Row>
      <Row>
        <FormInputText
          colSm={9}
          id="nome_fantasia"
          label="Nome Fantasia"
          obrigatory
          value={props.fields.fantasyName}
          onChange={(e) => props.handleChanges.handleFantasyNameChange(e)}
        />
        <FormInputText
          colSm={3}
          id="cnpj"
          label="CNPJ"
          obrigatory
          mask="99.999.999/9999-99"
          value={props.fields.cnpj}
          onChange={(e) => props.handleChanges.handleCnpjChange(e)}
        />
      </Row>
    </>
  );
}
