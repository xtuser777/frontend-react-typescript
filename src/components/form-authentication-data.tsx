import React, { ChangeEvent } from 'react';
import { FaKey, FaUserAlt } from 'react-icons/fa';
import { Row } from 'reactstrap';
import { FormInputSelect } from './form-input-select';
import { FormInputGroupText } from './form-input-group-text';
import { FormInputGroupPassword } from './form-input-group-password';

interface IFields {
  level?: string;
  login: string;
  password: string;
  passwordConfirm: string;
}

interface IHandle {
  handleLevelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirmChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IProps {
  page: string;
  fields: IFields;
  handleChanges: IHandle;
}

export function FormAuthenticationData(props: IProps): JSX.Element {
  return (
    <>
      {props.page == 'employee' && props.fields.level ? (
        <>
          <Row>
            <FormInputSelect
              colSm={6}
              id="nivel"
              label="Nível"
              obrigatory
              value={props.fields.level}
              onChange={(e) => props.handleChanges.handleLevelChange(e)}
            >
              <option value="0">SELECIONAR</option>
            </FormInputSelect>
            <FormInputGroupText
              colSm={6}
              id="login"
              label="Login"
              groupText={<FaUserAlt />}
              obrigatory
              value={props.fields.login}
              onChange={(e) => props.handleChanges.handleLoginChange(e)}
            />
          </Row>
          <Row>
            <FormInputGroupPassword
              colSm={6}
              id="senha"
              label="Senha"
              groupText={<FaKey />}
              obrigatory
              value={props.fields.password}
              onChange={(e) => props.handleChanges.handlePasswordChange(e)}
            />
            <FormInputGroupPassword
              colSm={6}
              id="conf-senha"
              label="Confirmar Senha"
              groupText={<FaKey />}
              obrigatory
              value={props.fields.passwordConfirm}
              onChange={(e) => props.handleChanges.handlePasswordConfirmChange(e)}
            />
          </Row>
        </>
      ) : (
        <Row>
          <FormInputGroupText
            colSm={4}
            id="login"
            label="Login"
            groupText={<FaUserAlt />}
            obrigatory
            value={props.fields.login}
            onChange={(e) => props.handleChanges.handleLoginChange(e)}
          />
          <FormInputGroupPassword
            colSm={4}
            id="senha"
            label="Senha"
            groupText={<FaKey />}
            obrigatory
            value={props.fields.password}
            onChange={(e) => props.handleChanges.handlePasswordChange(e)}
          />
          <FormInputGroupPassword
            colSm={4}
            id="conf-senha"
            label="Confirmar Senha"
            groupText={<FaKey />}
            obrigatory
            value={props.fields.passwordConfirm}
            onChange={(e) => props.handleChanges.handlePasswordConfirmChange(e)}
          />
        </Row>
      )}
    </>
  );
}
