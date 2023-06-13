import React, { ChangeEvent } from 'react';
import { BsPhoneFill, BsTelephoneFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { Row } from 'reactstrap';
import { FormInputText } from './form-input-text';
import { FormInputGroupText } from './form-input-group-text';
import { FormInputGroupEmail } from './form-input-group-email';
import { FormInputSelect } from './form-input-select';
import { State } from '../models/State';
import { City } from '../models/City';

interface IFields {
  street: string;
  errorStreet?: string;
  number: string;
  errorNumber?: string;
  neighborhood: string;
  errorNeighborhood?: string;
  complement: string;
  code: string;
  errorCode?: string;
  state: string;
  states: State[];
  errorState?: string;
  city: string;
  cities: City[];
  errorCity?: string;
  phone: string;
  errorPhone?: string;
  cellphone: string;
  errorCellphone?: string;
  email: string;
  errorEmail?: string;
  readonly?: boolean;
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
          colSm={5}
          id="rua"
          label="Rua"
          obrigatory
          value={props.fields.street}
          onChange={(e) => props.handleChanges.handleStreetChange(e)}
          message={props.fields.errorStreet}
          readonly={props.fields.readonly ? true : false}
        />
        <FormInputText
          colSm={1}
          id="numero"
          label="Número"
          obrigatory
          value={props.fields.number}
          onChange={(e) => props.handleChanges.handleNumberChange(e)}
          message={props.fields.errorNumber}
          readonly={props.fields.readonly ? true : false}
        />
        <FormInputText
          colSm={4}
          id="bairro"
          label="Bairro"
          obrigatory
          value={props.fields.neighborhood}
          onChange={(e) => props.handleChanges.handleNeighborhoodChange(e)}
          message={props.fields.errorNeighborhood}
          readonly={props.fields.readonly ? true : false}
        />
        <FormInputText
          colSm={2}
          id="complemento"
          label="Complemento"
          obrigatory={false}
          value={props.fields.complement}
          onChange={(e) => props.handleChanges.handleComplementChange(e)}
          readonly={props.fields.readonly ? true : false}
        />
      </Row>
      <Row>
        <FormInputSelect
          colSm={4}
          id="estado"
          label="Estado"
          obrigatory
          value={props.fields.state}
          onChange={props.handleChanges.handleStateChange}
          message={props.fields.errorState}
          disable={props.fields.readonly ? true : false}
        >
          <option value="0">SELECIONE</option>
          {props.fields.states.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </FormInputSelect>
        <FormInputSelect
          colSm={5}
          id="cidade"
          label="Cidade"
          obrigatory
          value={props.fields.city}
          disable={props.fields.state == '0' || props.fields.readonly ? true : false}
          onChange={(e) => props.handleChanges.handleCityChange(e)}
          message={props.fields.errorCity}
        >
          <option value="0">SELECIONE</option>
          {props.fields.cities.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </FormInputSelect>
        <FormInputText
          colSm={3}
          id="cep"
          label="CEP"
          mask="00.000-000"
          value={props.fields.code}
          obrigatory
          onChange={(e) => props.handleChanges.handleCodeChange(e)}
          message={props.fields.errorCode}
          readonly={props.fields.readonly ? true : false}
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
          message={props.fields.errorPhone}
          readonly={props.fields.readonly ? true : false}
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
          message={props.fields.errorCellphone}
          readonly={props.fields.readonly ? true : false}
        />
        <FormInputGroupEmail
          colSm={6}
          id="email"
          label="E-mail"
          groupText={<MdAlternateEmail />}
          obrigatory
          value={props.fields.email}
          onChange={(e) => props.handleChanges.handleEmailChange(e)}
          message={props.fields.errorEmail}
          readonly={props.fields.readonly ? true : false}
        />
      </Row>
    </>
  );
}
