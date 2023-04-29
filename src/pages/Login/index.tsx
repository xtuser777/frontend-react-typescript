import React, { ChangeEvent, useState } from 'react';
import { CardTitle } from '../../components/card-title';
import { Badge, Button, FormGroup, Input, Label } from 'reactstrap';

import './style.css';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import * as actions from '../../store/modules/auth/actions';

export function Login(): JSX.Element {
  const dispatch = useDispatch();

  const prevPath = get(document, 'location.state.prevPath', '');

  let errors = false;

  const [login, setLogin] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleClick = () => {
    if (login.length == 0) {
      errors = true;
      setErrorLogin('O Login precisa ser preenchido!');
    } else {
      errors = false;
      setErrorLogin('');
    }

    if (password.length == 0) {
      errors = true;
      setErrorPassword('A senha precisa ser preenchida!');
    } else {
      if (password.length < 6) {
        errors = true;
        setErrorPassword('A senha precisa ter 6 caracteres!');
      } else {
        errors = false;
        setErrorPassword('');
      }
    }

    alert(`${errors}`);

    if (!errors) {
      dispatch(actions.loginRequest({ login, password, prevPath }));
    }
  };

  return (
    <>
      <CardTitle text="Autenticação do Usuário" />
      <div className="box">
        <div className="logo "></div>
        <br />
        <br />
        <FormGroup>
          <Label for="login">Login:</Label>
          <Input
            type="text"
            name="login"
            id="login"
            value={login}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
          />
          <Badge
            id="erro-login"
            color="danger"
            className={errorLogin.length == 0 ? 'hidden' : ''}
          >
            {errorLogin}
          </Badge>
        </FormGroup>
        <FormGroup>
          <Label for="senha">Senha:</Label>
          <Input
            type="password"
            name="senha"
            id="senha"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Badge
            id="erro-password"
            color="danger"
            className={errorPassword.length == 0 ? 'hidden' : ''}
          >
            {errorPassword}
          </Badge>
        </FormGroup>
        <Button
          color="primary"
          id="btnEntrar"
          className="btn-login"
          onClick={handleClick}
        >
          ENTRAR
        </Button>
      </div>
    </>
  );
}
