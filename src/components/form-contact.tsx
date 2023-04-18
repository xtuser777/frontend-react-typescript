import React, { ChangeEvent } from 'react';
import { BsPhoneFill, BsTelephoneFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { Row } from 'reactstrap';
import { FormInputText } from './form-input-text';
import { FormInputSelect } from './form-input-select';
import { FormInputGroupText } from './form-input-group-text';
import { FormInputGroupEmail } from './form-input-group-email';

interface IFields {
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  code: string;
  state: string;
  city: string;
  phone: string;
  cellphone: string;
  email: string;
}

interface IHandle {
  handleStreetChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNeighborhoodChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleComplementChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCellphoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IProps {
  fields: IFields;
  handleChanges: IHandle;
}

export function FormContact(props: IProps): JSX.Element {
  return (
    <>
      <Row>
        <FormInputText
          colSm={9}
          id="rua"
          label="Rua"
          obrigatory
          value={props.fields.street}
          onChange={(e) => props.handleChanges.handleStreetChange(e)}
        />
        <FormInputText
          colSm={3}
          id="numero"
          label="Número"
          obrigatory
          value={props.fields.number}
          onChange={(e) => props.handleChanges.handleNumberChange(e)}
        />
      </Row>
      <Row>
        <FormInputText
          colSm={6}
          id="bairro"
          label="Bairro"
          obrigatory
          value={props.fields.neighborhood}
          onChange={(e) => props.handleChanges.handleNeighborhoodChange(e)}
        />
        <FormInputText
          colSm={6}
          id="complemento"
          label="Complemento"
          obrigatory={false}
          value={props.fields.complement}
          onChange={(e) => props.handleChanges.handleComplementChange(e)}
        />
      </Row>
      <Row>
        <FormInputSelect
          colSm={4}
          id="estado"
          label="Estado"
          obrigatory
          value={props.fields.state}
          onChange={(e) => props.handleChanges.handleStateChange(e)}
        >
          <option value="0">SELECIONE</option>
        </FormInputSelect>
        <FormInputSelect
          colSm={5}
          id="cidade"
          label="Cidade"
          obrigatory
          value={props.fields.city}
          disable={props.fields.state == '0'}
          onChange={(e) => props.handleChanges.handleCityChange(e)}
        >
          <option value="0">SELECIONE</option>
        </FormInputSelect>
        <FormInputText
          colSm={3}
          id="cep"
          label="CEP"
          mask="00.000-000"
          value={props.fields.code}
          obrigatory
          onChange={(e) => props.handleChanges.handleCodeChange(e)}
        />
      </Row>
      <Row>
        <FormInputGroupText
          colSm={3}
          id="tel"
          label="Telefone"
          groupText={<BsTelephoneFill />}
          obrigatory
          mask="(00) 0000-0000"
          value={props.fields.phone}
          onChange={(e) => props.handleChanges.handlePhoneChange(e)}
        />
        <FormInputGroupText
          colSm={3}
          id="cel"
          label="Celular"
          groupText={<BsPhoneFill />}
          obrigatory
          mask="(00) 00000-0000"
          value={props.fields.cellphone}
          onChange={(e) => props.handleChanges.handleCellphoneChange(e)}
        />
        <FormInputGroupEmail
          colSm={6}
          id="email"
          label="E-mail"
          groupText={<MdAlternateEmail />}
          obrigatory
          value={props.fields.email}
          onChange={(e) => props.handleChanges.handleEmailChange(e)}
        />
      </Row>
    </>
  );
}
