import React, { Component } from 'react';
import { CardTitle } from '../../components/card-title';
import { Button, FormGroup, Input, Label } from 'reactstrap';

import './style.css';

interface Props {
  text: string;
}

export class Login extends Component {
  render() {
    return (
      <>
        <CardTitle text="Autenticação do Usuário" />
        <div className="box">
          <div className="logo "></div>
          <br />
          <br />
          <FormGroup>
            <Label for="login">Login:</Label>
            <Input type="text" name="login" id="login" />
            <span id="msgLogin" className="label label-danger hidden"></span>
          </FormGroup>
          <FormGroup>
            <Label for="senha">Senha:</Label>
            <Input type="password" name="senha" id="senha" />
            <span id="msgSenha" className="label label-danger hidden"></span>
          </FormGroup>
          <Button color="primary" id="btnEntrar" className="btn-login">
            ENTRAR
          </Button>
          <span id="msgAutenticacao" className="label label-danger hidden"></span>
        </div>
      </>
    );
  }
}
