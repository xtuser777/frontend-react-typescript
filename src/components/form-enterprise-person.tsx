import React, { ChangeEvent } from 'react';
import { Row } from 'reactstrap';
import { FormInputText } from './form-input-text';

interface IFields {
  corporateName: string;
  errorCorporateName?: string;
  fantasyName: string;
  errorFantasyName?: string;
  cnpj: string;
  errorCnpj?: string;
}

interface IHandle {
  handleCorporateNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFantasyNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCnpjChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IProps {
  fields: IFields;
  handleChanges: IHandle;
  readonly?: boolean;
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
          value={props.fields.corporateName}
          onChange={props.handleChanges.handleCorporateNameChange}
          readonly={props.readonly ? true : false}
          message={props.fields.errorCorporateName}
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
          readonly={props.readonly ? true : false}
          message={props.fields.errorFantasyName}
        />
        <FormInputText
          colSm={3}
          id="cnpj"
          label="CNPJ"
          obrigatory
          mask="00.000.000/0000-00"
          value={props.fields.cnpj}
          onChange={(e) => props.handleChanges.handleCnpjChange(e)}
          readonly={props.readonly ? true : false}
          message={props.fields.errorCnpj}
        />
      </Row>
    </>
  );
}
